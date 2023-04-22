const express = require("express");
const ExpenseHandler = require("../controllers/expense");
const router = express.Router();

router.post("/add-expense", ExpenseHandler.postExpense);
router.get("/add-expense", ExpenseHandler.getExpenses);
// router.get("/user-data", UserHandler.getUserdata);
router.delete("/expense/:userId", ExpenseHandler.deleteExpense);
// router.put("/user-data/:userId", UserHandler.putUserdata);
module.exports = router;
