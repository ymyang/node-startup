/**
 * Created by yang on 2015/6/24.
 */
var Seq = require('../utils/seq.js');
var logger = require('../utils/logger.js');
var _ = require('lodash');

describe('test seq.js', function() {
    it.only('getNextId', function() {
        Seq.getNextId().then(function(id) {
            console.log('getNextId:', id)
        }).catch(function(err) {
            console.error(err);
        });
    });
    it('getNextId-1', function() {
        var tasks = _.range(100).map(function() {
            return Seq.getNextId();
        });
        console.time("seqNo-test");
        Promise.all(tasks).then(function(r) {
            console.log('getNextId-1:', r.length);
            console.timeEnd("seqNo-test");
        });
    });
    it('getNextId-2', function() {
        console.time("seqNo-test");
        Promise.reduce(_.range(100000), function() {
            return Seq.getNextId();
        }, []).then(function(r) {
            console.timeEnd("seqNo-test");
            console.log(r.length, ':', tasktime);
        });
    });
});



