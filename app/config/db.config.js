module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "ROOT@123",
    DB: "dbtesting",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  