const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController.js");

router.get("/login", accountController.loginView);
router.get("/register", accountController.registerView);


router.post("/register", accountController.createUser);
router.post("/login", );



module.exports = router;