/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Department', { 
    deptId: {
      field: 'dept_id',
      primaryKey: true,
      type: DataTypes.BIGINT,
      allowNull: false
    },
    parentId: {
      field: 'parent_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    parentIds: {
      field: 'parent_ids',
      type: DataTypes.STRING,
      allowNull: false
    },
    deptName: {
      field: 'dept_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    orderValue: {
      field: 'order_value',
      type: DataTypes.INTEGER(11),
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
    tableName: 'department',
    timestamps: false,
    freezeTableName: true
  });
};
