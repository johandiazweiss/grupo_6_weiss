const express = require("express");
const router = express.Router();
const ApiCustomersController = require('../ApiControllers/ApiCustomersController');
//--------------------API router----

router.get('/', ApiCustomersController.list);
router.get('/detalle/:id', ApiCustomersController.detail);


router.post('/create', ApiCustomersController.store);
router.delete('/:id/delete', ApiCustomersController.delete); 

module.exports = router;