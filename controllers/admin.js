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
  Product.create({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
  })
    .then((data) => {
      console.log("data stored data successfully");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;

  console.log(editMode);
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findByPk(prodId).then((product) => {
    if (!product) {
      return res.reIirect("/");
    }
    console.log("product");
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
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
  Product.findByPk(prodId)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));

  // const updayedproduct = new Product(
  //   prodId,
  //   title,
  //   imageUrl,
  //   description,
  //   price
  // );
  // console.log("once created updated data...=>", updayedproduct);
  // updayedproduct
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
};
exports.postDeleteproduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId)
    .then((data) => {
      return data.destroy();
    })
    .then((data) => {
      console.log("product got deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.deletePoduct(prodId)
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
};
exports.getProducts = (req, res, next) => {
  Product.findAll().then((data) => {
    console.log(data);
    res.render("admin/products", {
      prods: data,
      pageTitle: "Admin Products",
      path: "/admin/products",
      editing: false,
    });
  });
  //   .catch((err) => console.log(err));
  // Product.fetchAll().then(([products, somefun]) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products",
  //     editing: false,
  //   });
  // });
};
