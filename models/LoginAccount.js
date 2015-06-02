/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('LoginAccount', {
        loginId: {
            field: 'login_id',
            primaryKey: true,
            type: DataTypes.BIGINT,
            allowNull: false
        },
        userId: {
            field: 'user_id',
            type: DataTypes.BIGINT,
            allowNull: false
        },
        entName: {
            field: 'ent_name',
            type: DataTypes.STRING,
            allowNull: true
        },
        userName: {
            field: 'user_name',
            type: DataTypes.STRING,
            allowNull: false
        }
    } , {
        tableName: 'login_account',
        timestamps: false,
        freezeTableName: true
    });
};
