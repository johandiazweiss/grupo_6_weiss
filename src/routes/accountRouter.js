const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController.js");
const formValidations = require("../middlewares/formValidations.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware.js");





router.get("/login", guestMiddleware ,accountController.loginView);
router.get("/register", guestMiddleware, accountController.registerView);
router.get("/detalles/admin", adminAuthMiddleware , accountController.adminView);



router.post("/register", formValidations.registerValidations, accountController.createUser);
router.post("/login",formValidations.loginValidations, accountController.login);
router.get("/logout", authMiddleware, accountController.logout);

router.get("/detalles", authMiddleware, accountController.accountDetailsView);
router.put("/detalles/editar-cuenta", authMiddleware, formValidations.editAccountValidations, accountController.editAccount);
router.put("/detalles/change-password", authMiddleware, formValidations.changePasswordValidations, accountController.changePassword);
router.delete("/detalles/eliminar-cuenta", authMiddleware, accountController.deleteAccount);


module.exports = router;