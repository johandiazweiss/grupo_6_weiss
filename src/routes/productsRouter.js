const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController.js")

router.get("/", productsController.productsView);
router.get("/categoria/:categoria?", productsController.productsCategoryView);
router.get("/detalle/:id", productsController.productDetailView);

module.exports = router;
