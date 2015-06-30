/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('YliFile', { 
    fileId: {
      field: 'file_id',
      primaryKey: true,
      type: DataTypes.BIGINT,
      allowNull: false
    },
    parentId: {
      field: 'parent_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    fsFileId: {
      field: 'fs_file_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    fileType: {
      field: 'file_type',
      type: DataTypes.STRING,
      allowNull: false
    },
    parentIds: {
      field: 'parent_ids',
      type: DataTypes.STRING,
      allowNull: false
    },
    fileName: {
      field: 'file_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    fileSize: {
      field: 'file_size',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    thumb: {
      field: 'thumb',
      type: DataTypes.STRING,
      allowNull: true
    },
    folder: {
      field: 'folder',
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    version: {
      field: 'version',
      type: DataTypes.BIGINT,
      allowNull: false
    },
    lastAction: {
      field: 'last_action',
      type: DataTypes.STRING,
      allowNull: false
    },
    convStatus: {
      field: 'conv_status',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    indexStatus: {
      field: 'index_status',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    indexTime: {
      field: 'index_time',
      type: DataTypes.DATE,
      allowNull: true
    },
    delStatus: {
      field: 'del_status',
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    createrId: {
      field: 'creater_id',
      type: DataTypes.BIGINT,
      allowNull: false
    },
    createrName: {
      field: 'creater_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    createTime: {
      field: 'create_time',
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'yli_file',
    timestamps: false,
    freezeTableName: true
  });
};
