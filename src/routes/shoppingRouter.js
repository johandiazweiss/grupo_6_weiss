const express = require("express");
const router = express.Router();
const shoppingController = require("../controllers/shoppingController.js");

router.get("/", shoppingController.shoppingCartView);

module.exports = router;