const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// const db = require("./util/database");
const cors = require("cors");
const sequelizedb = require("./util/database");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(cors());
// db.execute("SELECT * FROM products")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const UserRouter = require("./routes/user");
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(UserRouter);
// app.use("/user-input", (req, res, next) => {
//   console.log("hi am user inputut");
//   res.json({ name: "sam", place: ["bangalore", "chennai"] });
// });
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelizedb
  .sync()
  .then((data) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
// app.listen(3000);
