const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "new_schema",
  password: "nandhu11*8",
});

module.exports = pool.promise();
