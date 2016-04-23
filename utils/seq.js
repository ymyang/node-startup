/**
 * Created by yang on 2015/6/24.
 */
'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var sequelize = require('../models').sequelize;
var Sequence = require('../models/').Sequence;
var config = require('../config.json');

var seq = module.exports = {};

const CACHE_SIZE = config.seqCache;
const INIT_VALUE = 100;
const GLOBAL_ID = 'global_id';

const SQL_SELECT_SEQ = "SELECT `seq_name` AS `seqName`, `seq_value` AS `seqValue` FROM `sequence` AS `Sequence`"
    + " WHERE `Sequence`.`seq_name` = 'global_id' FOR UPDATE";

var currentSeqValue = INIT_VALUE;
var maxSeqValue = 0;
var initialized = false;

//_setupSeqValue(1);

seq.getNextId = function (max) {
    let num = max || 1;
    currentSeqValue += num;
    if (initialized && currentSeqValue < maxSeqValue) {
        return _buildResult(max);
    }
    return _setupSeqValue(num).then(function () {
        return _buildResult(max);
    });
};

function _buildResult(max) {
    if (max) {
        let values = _.range(max).map(function(i) {
            return _finalSeqValue(currentSeqValue - max + i + 1);
        });
        return Promise.resolve(values);
    } else {
        let seqValue = _finalSeqValue(currentSeqValue);
        return Promise.resolve(seqValue);
    }
}

function _finalSeqValue(value) {
    return 1000*value + parseInt(config.serverId);
}

function _setupSeqValue(num) {
    return new Promise(function (resolve, reject) {
        sequelize.transaction({autocommit: false}).then(function (t) {
            sequelize.query(SQL_SELECT_SEQ, {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                model: Sequence
            }).then(function (seq) {
                if (seq[0]) {
                    let _seqValueInDB = seq[0].dataValues.seqValue;
                    console.log('_seqValueInDB:', _seqValueInDB, ', currentSeqValue:', currentSeqValue);

                    if (!initialized || _seqValueInDB <= currentSeqValue) {
                        if (initialized) {
                            currentSeqValue += num;
                        } else {
                            currentSeqValue = _seqValueInDB + num;
                        }
                        initialized = true;

                        maxSeqValue = currentSeqValue + CACHE_SIZE;

                        console.log('currentSeqValue:', currentSeqValue, ', maxSeqValue:', maxSeqValue);
                        return Sequence.update({
                            seqValue: maxSeqValue
                        }, {
                            where: {seqName: GLOBAL_ID},
                            transaction: t
                        });
                    } else {
                        currentSeqValue += num;
                        return Promise.resolve();
                    }
                } else {
                    currentSeqValue = INIT_VALUE + num;
                    maxSeqValue = currentSeqValue + CACHE_SIZE;
                    seq = {
                        seqName: GLOBAL_ID,
                        seqValue: maxSeqValue
                    };
                    return Sequence.create(seq, {transaction: t});
                }
            }).then(function () {
                t.commit();
                resolve();
            }).catch(function (err) {
                t.rollback();
                reject(err);
            });
        });
    });
}
