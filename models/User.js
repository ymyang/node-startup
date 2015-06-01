/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', { 
    userId: {
      field: 'user_id',
      primaryKey: true,
      type: DataTypes.BIGINT,
      allowNull: false
    },
    mail: {
      field: 'mail',
      type: DataTypes.STRING,
      allowNull: true
    },
    userName: {
      field: 'user_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    signature: {
      field: 'signature',
      type: DataTypes.STRING,
      allowNull: true
    },
    joinTime: {
      field: 'join_time',
      type: DataTypes.DATE,
      allowNull: false
    },
    userType: {
      field: 'user_type',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    gender: {
      field: 'gender',
      type: 'CHAR(1)',
      allowNull: true
    },
    age: {
      field: 'age',
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    birthday: {
      field: 'birthday',
      type: DataTypes.DATE,
      allowNull: true
    },
    city: {
      field: 'city',
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile: {
      field: 'mobile',
      type: DataTypes.STRING,
      allowNull: true
    },
    icon: {
      field: 'icon',
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      field: 'phone',
      type: DataTypes.STRING,
      allowNull: true
    },
    diskSize: {
      field: 'disk_size',
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    realName: {
      field: 'real_name',
      type: DataTypes.STRING,
      allowNull: true
    },
    major: {
      field: 'major',
      type: DataTypes.STRING,
      allowNull: true
    },
    locked: {
      field: 'locked',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    entId: {
      field: 'ent_id',
      type: DataTypes.BIGINT,
      allowNull: false
    },
    deptId: {
      field: 'dept_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    empNum: {
      field: 'emp_num',
      type: DataTypes.STRING,
      allowNull: true
    },
    userStatus: {
      field: 'user_status',
      type: DataTypes.STRING,
      allowNull: false
    },
    jobTitle: {
      field: 'job_title',
      type: DataTypes.STRING,
      allowNull: true
    },
    hobby: {
      field: 'hobby',
      type: DataTypes.STRING,
      allowNull: true
    },
    deviceToken: {
      field: 'device_token',
      type: DataTypes.STRING,
      allowNull: true
    },
    contactDisplay: {
      field: 'contact_display',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    userFrom: {
      field: 'user_from',
      type: DataTypes.STRING,
      allowNull: true
    },
    diskEnabled: {
      field: 'disk_enabled',
      type: DataTypes.BOOLEAN,
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
    lastLogin: {
      field: 'last_login',
      type: DataTypes.DATE,
      allowNull: true
    },
    personalLinkEnabled: {
      field: 'personal_link_enabled',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    deleted: {
      field: 'deleted',
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    mailAuthed: {
      field: 'mail_authed',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    mobileAuthed: {
      field: 'mobile_authed',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    lastAgent: {
      field: 'last_agent',
      type: DataTypes.STRING,
      allowNull: true
    },
    namespace: {
      field: 'namespace',
      type: DataTypes.STRING,
      allowNull: true
    }
  } , {
    tableName: 'user',
    timestamps: false,
    freezeTableName: true
 });
};
