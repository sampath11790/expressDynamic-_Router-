const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      // console.log("this constructor data current instence", this);
      if (this.id) {
        const existingProductindex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductindex] = this;
        console.log(updatedProducts);
        console.log(existingProductindex);
        // console.log("its working");
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        // console.log("its  not working");
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
  static deletePoduct(id, cb) {
    fs.readFile(p, (err, data) => {
      // console.log(JSON.parse(data));
      let products = [...JSON.parse(data)];
      // console.log(products);

      if (!err) {
        products = products.filter((each) => each.id !== id);
      }
      console.log(products);
      // cb();
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (!err) {
          return cb();
        }
        cb();
      });
    });
  }
};
