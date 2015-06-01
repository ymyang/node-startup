/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Department', { 
    deptId: {
      field: 'dept_id',
      primaryKey: true,
      type: DataTypes.BIGINT,
      allowNull: false
    },
    entId: {
      field: 'ent_id',
      type: DataTypes.BIGINT,
      allowNull: false
    },
    deptName: {
      field: 'dept_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: {
      field: 'parent_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    orderValue: {
      field: 'order_value',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    createrId: {
      field: 'creater_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    createrName: {
      field: 'creater_name',
      type: DataTypes.STRING,
      allowNull: true
    },
    createTime: {
      field: 'create_time',
      type: DataTypes.DATE,
      allowNull: true
    },
    roleId: {
      field: 'role_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    folderId: {
      field: 'folder_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    namespace: {
      field: 'namespace',
      type: DataTypes.STRING,
      allowNull: true
    }
  } , {
    tableName: 'department',
    timestamps: false,
    freezeTableName: true
 });
};
