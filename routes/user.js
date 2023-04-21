const express = require("express");
const UserHandler = require("../controllers/usertest");
const router = express.Router();

router.post("/user-input", UserHandler.postUserdata);
router.get("/user-data", UserHandler.getUserdata);
router.delete("/user-data/:userId", UserHandler.deleteUserdata);
router.put("/user-data/:userId", UserHandler.putUserdata);
module.exports = router;
