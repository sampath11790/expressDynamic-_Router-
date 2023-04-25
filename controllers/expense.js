const Expense = require("../models/expense");
exports.postExpense = (req, res, next) => {
  const id = req.body.id;
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  if (!id) {
    //creating new row
    Expense.create({
      amount: amount,
      description: description,
      category: category,
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log("err", err));
    console.log(req.body);
  }
  //updating same row if id is true

  Expense.findByPk(id)
    .then((data) => {
      data.amount = amount;
      data.category = category;
      data.description = description;
      return data.save();
    })
    .then((data) => {
      res.json({ message: "successlly updated" });
    })
    .catch((err) => console.log(err));

  // res.send({ name: "success" });
};

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
  const id = req.params.userId;
  Expense.findByPk(id)
    .then((data) => {
      return data.destroy();
    })
    .then((data) => {
      res.json({ message: "successlly deleted" });
    })
    .catch((err) => console.log(err));
};
