const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.tags = require("./tag.model.js")(sequelize, Sequelize);

db.tags.belongsToMany(db.tutorials, {
  through: "tutorial_tag",
  as: "tutorials",
  foreignKey: "tag_id",
});
db.tutorials.belongsToMany(db.tags, {
  through: "tutorial_tag",
  as: "tags",
  foreignKey: "tutorial_id",
});

module.exports = db;