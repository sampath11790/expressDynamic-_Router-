// without sequelize

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "new_schema",
//   password: "nandhu11*8",
// });

// module.exports = pool.promise();

//with sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize("new_schema", "root", "nandhu11*8", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
