const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController.js");
const formValidations = require("../middlewares/formValidations.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const guestMiddleware = require("../middlewares/guestMiddleware.js");


/*---------------------temp------------------*/
const db = require("../database/models/index.js");



router.get("/login", guestMiddleware ,accountController.loginView);
router.get("/register", guestMiddleware, accountController.registerView);



router.post("/register", formValidations.registerValidations, accountController.createUser);
router.post("/login",formValidations.loginValidations, accountController.login);
router.get("/logout", authMiddleware, accountController.logout);

router.get("/detalles", authMiddleware, accountController.accountDetailsView);
router.put("/detalles/editar-cuenta", formValidations.editAccountValidations, accountController.editAccount);
router.put("/detalles/change-password", accountController.changePassword);
router.delete("/detalles/eliminar-cuenta", accountController.deleteAccount);




//----------------------temp
router.get("/userActual", (req, res)=>{
    req.session.userLogged != undefined? res.send(req.session.userLogged) : res.send("no user logged");
})



router.get("/customersprueba", (req, res)=>{
    db.Roles.findAll({
        include: [{association: "users"}]
    })
    .then((roles)=>{
        res.send(roles)
    })
    .catch(()=>{
        res.send("Algo salió mal")
    })
})


module.exports = router;