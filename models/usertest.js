const Sequelize = require("sequelize");

const sequelize = require("../util/database");
console.log("usertext");
const Usertest = sequelize.define("usertests", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
// console.log(Usertest);
// console.log(User)
module.exports = Usertest;
