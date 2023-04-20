const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  console.log(editMode);
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(prodId).then(([product, somefun]) => {
    if (!product) {
      return res.redirect("/");
    }
    console.log("product");
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product[0],
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log("productid==>", req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const updayedproduct = new Product(
    prodId,
    title,
    imageUrl,
    description,
    price
  );
  // console.log("once created updated data...=>", updayedproduct);
  updayedproduct
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
exports.postDeleteproduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deletePoduct(prodId)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products, somefun]) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      editing: false,
    });
  });
};
