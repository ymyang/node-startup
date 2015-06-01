/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VLogin', { 
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
    },
    password: {
      field: 'password',
      type: DataTypes.STRING,
      allowNull: true
    },
    authed: {
      field: 'authed',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  } , {
    tableName: 'v_login',
    timestamps: false,
    freezeTableName: true
 });
};
