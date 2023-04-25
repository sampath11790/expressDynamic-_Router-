const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render("shop/product-list", {
        prods: data,
        pageTitle: "All Products",
        path: "/products",
      });
    })

    .catch((err) => console.log(err));
  // Product.fetchAll()
  //   .then(([data, somefun]) => {
  //     res.render("shop/product-list", {
  //       prods: data,
  //       pageTitle: "All Products",
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  //storing cart data after fetch
  let fetchedCart;
  let qty = 1;
  //magic method
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      //magic method

      return cart.getProducts({ where: { id: prodId } });
    })
    .then((data) => {
      let product;
      //checking data avaliable or not
      if (data.length > 0) {
        product = data[0];
      }
      // noww if product is true

      if (product) {
        //increase the product quentity

        let oldquantity = product.cartItem.quantity;
        qty = oldquantity + 1;
        console.log("updated product", product);
        return product;
        // return fetchedCart.addProduct(product, { through: { quantity: qty } });
      }
      //if data is undefined
      return Product.findByPk(prodId);
    })
    .then((data) => {
      //magic method
      return fetchedCart.addProduct(data, { through: { quantity: qty } });
    })
    .then((data) => {
      // return fetchedCart.addProduct(data, { through: { quantity: qty } });
      res.redirect("/cart");
    });

  // console.log(data);
  // })
  // .catch((err) => console.log(err));

  // const prodId = req.body.productId;
  // console.log(prodId);
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });

  // res.redirect("/cart");
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((data) => {
      console.log(data);
      res.render("shop/product-detail", {
        product: data,
        pageTitle: data.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
  // Product.findById(prodId)
  //   .then(([product]) => {
  //     res.render("shop/product-detail", {
  //       product: product[0],
  //       pageTitle: product[0].title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Product.findById(prodId, (product) => {
  //   res.render("shop/product-detail", {
  //     product: product,
  //     pageTitle: product.title,
  //     path: "/products",
  //   });
  // });
};

exports.getIndex = (req, res, next) => {
  // console.log("Product get index", Product.products);
  Product.findAll()
    .then((data) => {
      // console.log(data);
      res.render("shop/index", {
        prods: data,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));

  // .then(([data, somefun]) => {
  //   console.log(data);
  //   res.render("shop/index", {
  //     prods: data,
  //     pageTitle: "Shop",
  //     path: "/",
  //   });
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((data) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: data,
      });

      console.log(data);
    })
    .catch((err) => console.log(err));
  // console.log(req.user.getCart());
  // res.render("shop/cart", {
  //   path: "/cart",
  //   pageTitle: "Your Cart",
  // });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

//before modification
// const Product = require("../models/product");
// const Cart = require("../models/cart");
// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("shop/product-list", {
//       prods: products,
//       pageTitle: "All Products",
//       path: "/products",
//     });
//   });
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   console.log(prodId);
//   Product.findById(prodId, (product) => {
//     Cart.addProduct(prodId, product.price);
//   });

//   res.redirect("/cart");
// };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId, (product) => {
//     res.render("shop/product-detail", {
//       product: product,
//       pageTitle: product.title,
//       path: "/products",
//     });
//   });
// };

// exports.getIndex = (req, res, next) => {

//   Product.fetchAll((products) => {
//     res.render("shop/index", {
//       prods: products,
//       pageTitle: "Shop",
//       path: "/",
//     });
//   });
// };

// exports.getCart = (req, res, next) => {
//   res.render("shop/cart", {
//     path: "/cart",
//     pageTitle: "Your Cart",
//   });
// };

// exports.getOrders = (req, res, next) => {
//   res.render("shop/orders", {
//     path: "/orders",
//     pageTitle: "Your Orders",
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
