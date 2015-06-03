var Sequelize = require('sequelize');
var models = module.exports = {};

var sqlLog = function (content) {
	console.log('[sql]:', content);
};

var sequelize = new Sequelize('oatos_ent', 'root', 'admin', {
	host: 'localhost',
	dialect: 'mysql',
	logging: sqlLog,
	pool: {
		max: 5,
		min: 0,
		idle: 100
	}
});

models.sequelize = sequelize;
models.Enterprise = sequelize.import('./Enterprise.js');
models.Department = sequelize.import('./Department.js');
models.User = sequelize.import('./User.js');
models.VLogin = sequelize.import('./VLogin.js');
models.LoginAccount = sequelize.import('./LoginAccount.js');

// models.Department.belongsTo(models.Enterprise);
models.Enterprise.hasMany(models.Department, {foreignKey: 'entId'});
models.Department.hasMany(models.User, {foreignKey: 'deptId'});
models.User.hasMany(models.VLogin, {foreignKey: 'userId'});
models.User.hasMany(models.LoginAccount, {foreignKey: 'userId'});