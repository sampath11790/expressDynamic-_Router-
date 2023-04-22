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

// async function some() {
const Sequelize = require("sequelize");

const sequelize = new Sequelize("new_schema", "root", "nandhu11*8", {
  dialect: "mysql",
  host: "localhost",
  pool: {
    max: 10, // set the maximum number of connections in the pool to 10
  },
});

// const instanceCount =;
// console.log(`Number of Sequelize instances: ${sequelize}`);
try {
  sequelize.authenticate();
  console.log("Connection to database has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
module.exports = sequelize;
