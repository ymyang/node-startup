/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FsFile', { 
    fileId: {
      field: 'file_id',
      primaryKey: true,
      type: DataTypes.BIGINT,
      allowNull: false
    },
    thumbId: {
      field: 'thumb_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    viewId: {
      field: 'view_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    fileName: {
      field: 'file_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    fileSize: {
      field: 'file_size',
      type: DataTypes.BIGINT,
      allowNull: false
    },
    fileCrc32: {
      field: 'file_crc32',
      type: DataTypes.BIGINT,
      allowNull: false
    },
    fileMd5: {
      field: 'file_md5',
      type: DataTypes.STRING,
      allowNull: false
    },
    imgStatus: {
      field: 'img_status',
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    convStatus: {
      field: 'conv_status',
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    createTime: {
      field: 'create_time',
      type: DataTypes.DATE,
      allowNull: false
    }
  } , {
    tableName: 'fs_file',
    timestamps: false,
    freezeTableName: true
  });
};
