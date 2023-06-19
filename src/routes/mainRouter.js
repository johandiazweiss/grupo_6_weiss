const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");

const mainController = require("../controllers/mainController.js");

router.get("/", mainController.homeView);
//router.get("/envios", mainController.enviosView);
//router.get("/lista-de-deseos", authMiddleware, mainController.wishlistView);

//router.get("/nosotros", mainController.nosotrosView);
//router.get("/contacto", mainController.contacto);
router.get("/sucursales", mainController.sucursales);
//router.get("/terminosycondiciones", mainController.terminos_condicionesView);


router.get("/search", mainController.search);  

module.exports = router;
