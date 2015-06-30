/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', { 
    userId: {
      field: 'user_id',
      primaryKey: true,
      type: DataTypes.BIGINT,
      allowNull: false
    },
    deptId: {
      field: 'dept_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    userName: {
      field: 'user_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    realName: {
      field: 'real_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    userPwd: {
      field: 'user_pwd',
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      field: 'title',
      type: DataTypes.STRING,
      allowNull: true
    },
    number: {
      field: 'number',
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      field: 'gender',
      type: DataTypes.ENUM('MALE','FEMALE'),
      allowNull: true
    },
    birth: {
      field: 'birth',
      type: DataTypes.DATE,
      allowNull: true
    },
    mail: {
      field: 'mail',
      type: DataTypes.STRING,
      allowNull: true
    },
    tel: {
      field: 'tel',
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile: {
      field: 'mobile',
      type: DataTypes.STRING,
      allowNull: true
    },
    userStatus: {
      field: 'user_status',
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    updateUserId: {
      field: 'update_user_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updateUserName: {
      field: 'update_user_name',
      type: DataTypes.STRING,
      allowNull: true
    },
    updateTime: {
      field: 'update_time',
      type: DataTypes.DATE,
      allowNull: true
    }
  } , {
    tableName: 'user',
    timestamps: false,
    freezeTableName: true
  });
};
