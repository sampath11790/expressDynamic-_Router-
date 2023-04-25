const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");
const Product = require("./models/product");
const errorController = require("./controllers/error");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const cors = require("cors");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(cors());
const sequelizedb = require("./util/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const UserRouter = require("./routes/user");
const ExpenseRouer = require("./routes/expense");
// const CartItem = require("./models/cart-item");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(UserRouter);

// adding stored  user object inside the req like new prop with out  by middleware function
app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    //if user present
    req.user = user;
    next();
    //now this user avaliable inside the request
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(ExpenseRouer);
app.use(errorController.get404);

//association or relation
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
//import

//if u reset ur table use inside the sync({ force: true })
//{ force: true }
sequelizedb
  .sync()
  // .sync({ force: true })
  .then((data) => {
    //now static user added
    User.findByPk(1)
      .then((user) => {
        //if user present
        if (!user) {
          return User.create({ name: "sam", email: "sampath@gmail.com" });
        }
        return user;
      })
      .then((user) => {
        //this is magic method fro sequelize assocation
        console.log(user.getCart());
      });
    // console.log(data.connectionManager);
    app.listen(4000);
  })
  .catch((err) => console.log(err));
// app.listen(3000);
