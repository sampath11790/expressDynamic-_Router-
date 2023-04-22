const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const cors = require("cors");

const app = express();

// db.execute()
//   .then((data) => {})
//   .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(cors());
const sequelizedb = require("./util/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const UserRouter = require("./routes/user");
const ExpenseRouer = require("./routes/expense");
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(UserRouter);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(ExpenseRouer);
app.use(errorController.get404);
// sequelizedb2
//   .sync()
//   .then((data) => {})
//   .catch((err) => console.log(err));
sequelizedb
  .sync()
  .then((data) => {
    // console.log(data.connectionManager);
    app.listen(4000);
  })
  .catch((err) => console.log(err));
// app.listen(3000);
