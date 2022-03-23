const Sequelize = require('sequelize')
const { dbConfig } = require('../startup')
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

let models = {};

models.WaybillDetails = require("./WaybillDetails")(sequelize, Sequelize);

// models.User.sync({});

models.WaybillDetails.sync();

Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})


models.Sequelize = Sequelize
models.sequelize = sequelize

module.exports = models;