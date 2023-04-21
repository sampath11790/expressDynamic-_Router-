const Usertest = require("../models/usertest");

exports.postUserdata = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  Usertest.create({
    name: name,
    email: email,
    phone: phone,
  })
    .then((data) => {
      console.log("user data stored successfully ");
      res.json(req.body);
    })
    .catch((err) => console.log(err));
  //   console.log(req.body);
  //   res.json(req.body);
};

exports.getUserdata = (req, res, next) => {
  Usertest.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "error" });
    });
};

exports.deleteUserdata = (req, res, next) => {
  let id = req.params.userId;
  Usertest.findByPk(id)
    .then((data) => {
      return data.destroy();
    })
    .then((data) => {
      res.send({ message: "successfullydeleted" });
    })
    .catch((err) => console.log(err));
  console.log("user id for delete", id);
};

exports.putUserdata = (req, res, next) => {
  let id = req.params.userId;
  Usertest.findByPk(id)
    .then((data) => {
      data.name = req.body.name;
      data.email = req.body.email;
      data.phone = req.body.phone;
      return data.save();
    })
    .then((data) => {
      res.send({ message: "successfullydeleted" });
    })
    .catch((err) => console.log(err));
  console.log("user id for delete", id);
  //   res.send({ message: "successfullydeleted" });
};
