const express = require("express");
const router = express.Router();
const ApiProductsController = require("../ApiControllers/ApiProductsController");
//--------------------API router----

router.get('/', ApiProductsController.list);

router.get('/detalle/:id', ApiProductsController.detail);


router.post('/create', ApiProductsController.store);
router.delete('/:id/delete', ApiProductsController.delete);





module.exports = router;