var Sequelize = require('sequelize');
var models = module.exports = {};

var sequelize = new Sequelize('oatos_ent', 'root', 'admin', {
	host: 'localhost',
	dialect: 'mysql',
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

// models.Department.belongsTo(models.Enterprise);
models.Enterprise.hasMany(models.Department, {foreignKey: 'ent_id'});
models.Department.hasMany(models.User, {foreignKey: 'dept_id'});
models.User.hasMany(models.VLogin, {foreignKey: 'user_id'});