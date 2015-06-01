/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Enterprise', { 
    entId: {
      field: 'ent_id',
      primaryKey: true,
      type: DataTypes.BIGINT,
      allowNull: false
    },
    prodKey: {
      field: 'prod_key',
      type: DataTypes.STRING,
      allowNull: true
    },
    entName: {
      field: 'ent_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      field: 'phone',
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile: {
      field: 'mobile',
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      field: 'address',
      type: DataTypes.STRING,
      allowNull: true
    },
    mail: {
      field: 'mail',
      type: DataTypes.STRING,
      allowNull: true
    },
    contact: {
      field: 'contact',
      type: DataTypes.STRING,
      allowNull: true
    },
    fax: {
      field: 'fax',
      type: DataTypes.STRING,
      allowNull: true
    },
    postcode: {
      field: 'postcode',
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      field: 'website',
      type: DataTypes.STRING,
      allowNull: true
    },
    maxUser: {
      field: 'max_user',
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    logo: {
      field: 'logo',
      type: DataTypes.STRING,
      allowNull: true
    },
    empPwd: {
      field: 'emp_pwd',
      type: DataTypes.STRING,
      allowNull: true
    },
    registerTime: {
      field: 'register_time',
      type: DataTypes.DATE,
      allowNull: true
    },
    shareDiskSize: {
      field: 'share_disk_size',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    expirationTime: {
      field: 'expiration_time',
      type: DataTypes.DATE,
      allowNull: true
    },
    entStatus: {
      field: 'ent_status',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1'
    },
    txtLogo: {
      field: 'txt_logo',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    agent: {
      field: 'agent',
      type: DataTypes.STRING,
      allowNull: true
    }
  } , {
    tableName: 'enterprise',
    timestamps: false,
    freezeTableName: true
 });
};
