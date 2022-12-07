const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models/index.js");





const accountController = {
    registerView: (req, res) => {
        res.render("./accountViews/registro_weiss.ejs", { title: "Registrarse | Weiss Ahumados" });

    },
    createUser: (req, res) => {
        let validationErrors = validationResult(req);
        let formData = req.body
        if (validationErrors.isEmpty()) {
            db.Users.findOne({
                where: { email: formData.email_register }
            })
                .then((email) => {
                    if (email) {
                        let errorsMapped = { emailAlreadyRegistered: { msg: "El correo electrónico ingresado ya está registrado. Por favor, ingresá a tu cuenta" } };
                        let persisted = req.body
                        res.render("./accountViews/registro_weiss.ejs", { title: "Registrarse | Weiss Ahumados", errorsMapped, persisted });
                    }
                    else {
                        db.Users.create({
                            include: [{ association: "roles" }],
                            first_name: formData.firstName_register,
                            last_name: formData.lastName_register,
                            birth_date: formData.birthDate_register,
                            email: formData.email_register,
                            password: bcrypt.hashSync(formData.password_register, 12),
                            newsletter: formData.newsletter_register,
                        })
                            .then(() => {
                                db.Users.findOne({
                                    include: [{ association: "roles" }],
                                    where: { email: formData.email_register }
                                })
                                    .then((userCreated) => {
                                        req.session.userLogged = userCreated;
                                        res.redirect("/");
                                    })
                                    .catch(() => {
                                        res.send("Error: Algo salió mal");
                                    })
                            })
                            .catch(() => {
                                res.send("Error: Algo salió mal");
                            })
                    }
                })
                .catch(() => {
                    res.send("Error: Algo salió mal");
                })
        }
        else {
            let errorsMapped = validationErrors.mapped();
            let persisted = req.body;
            res.render("./accountViews/registro_weiss.ejs", { title: "Registrarse | Weiss Ahumados", errorsMapped, persisted });
        }
    },

    //--------------------------------------------login---------------------------------------   
    loginView: (req, res) => {
        res.render("./accountViews/login_weiss.ejs", { title: "Login | Weiss Ahumados" });
    },
    login: (req, res) => {
        let formData = req.body;
        let validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) {
            db.Users.findOne({
                include: [{ association: "roles" }],
                where: { email: formData.email_login }
            })
                .then((user) => {
                    if (user) {
                        if (bcrypt.compareSync(formData.password_login, user.password)) {
                            req.session.userLogged = user;
                            formData.rememberUser_login == "on" ? res.cookie("userEmail", formData.email_login, { maxAge: (1000 * 60) * 1440 }) : "";
                            res.redirect("/");
                        }
                        else {
                            let errorsMapped = { loginError: { msg: "Comprueba tu contraseña y correo electrónico e inténtalo de nuevo." } };
                            let persisted = req.body;
                            res.render("./accountViews/login_weiss.ejs", { title: "Login | Weiss Ahumados", errorsMapped, persisted });
                        }
                    }
                    else {
                        let errorsMapped = { loginError: { msg: "Comprueba tu contraseña y correo electrónico e inténtalo de nuevo." } };
                        let persisted = req.body;
                        res.render("./accountViews/login_weiss.ejs", { title: "Login | Weiss Ahumados", errorsMapped, persisted });
                    }
                })
                .catch(() => {
                    res.send("Error: Algo salió mal");
                })
        }
        else {
            let errorsMapped = validationErrors.mapped();
            let persisted = req.body;
            res.render("./accountViews/login_weiss.ejs", { title: "Login | Weiss Ahumados", errorsMapped, persisted });
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("userEmail");
        res.redirect("/cuenta/login");
    },
    accountDetailsView: (req, res) => {
        res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados" });
    },

    editAccount: (req, res) => {
        let formData = req.body;
        let currentUser = req.session.userLogged;
        let validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) {
            if (formData.email_edit == currentUser.email) {
                return db.Users.update({
                    first_name: formData.firstName_edit,
                    last_name: formData.lastName_edit,
                    birth_date: formData.birthDate_edit,
                }, { where: { email: currentUser.email } }, { return: true })
                .then(() => {
                    db.Users.findOne({
                        include: [{ association: "roles" }],
                        where: { email: currentUser.email }
                    })
                    .then((user) => {
                        req.session.userLogged = user;
                        let updateSuccessMsg = "La información de la cuenta ha sido actualizada correctamente";
                        let currentUser = req.session.userLogged
                        res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados", updateSuccessMsg, currentUser });
                    })
                })
            }
            return db.Users.findOne({
                where: {email: formData.email_edit}
            })
            .then(user=>{
                if(user){
                    let errorsMapped = {emailAlreadyRegistered: { msg: formData.email_edit }};
                    let persisted = formData
                    return res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados", errorsMapped, persisted});

                }
                return db.Users.update({
                    first_name: formData.firstName_edit,
                    last_name: formData.lastName_edit,
                    birth_date: formData.birthDate_edit,
                    email: formData.email_edit
                }, { where: { email: currentUser.email } })
                .then(() => {
                    db.Users.findOne({
                        include: [{ association: "roles" }],
                        where: { email: formData.email_edit }
                    })
                    .then((user) => {
                        req.session.userLogged = user;
                        let updateSuccessMsg = "La información de la cuenta ha sido actualizada correctamente";
                        let currentUser = req.session.userLogged;
                        if (req.cookies.userEmail){
                            res.clearCookie("userEmail");
                            res.cookie("userEmail", formData.email_edit, { maxAge: (1000 * 60) * 1440 });
                        }
                        res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados", updateSuccessMsg, currentUser });
                    })
                })
            })
        }
        let errorsMapped = validationErrors.mapped();
        let persisted = req.body;
        res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados", errorsMapped, persisted });
    },

    changePassword: (req, res) => {
        let formData = req.body;
        let currentUser = req.session.userLogged;
        let validationErrors = validationResult(req);
        if(validationErrors.isEmpty()){
            if (bcrypt.compareSync(formData.oldPassword_edit, currentUser.password)){   
                return db.Users.update({
                    password: bcrypt.hashSync(formData.newPassword_edit, 12)
                }, { where: { email: currentUser.email } })
                .then(()=>{
                    let passwordChangeSuccessMsg = "La contraseña ha sido actualizada correctamente";
                    res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados", passwordChangeSuccessMsg});
                })
            }
            let errorsMapped = {oldPasswordError: { msg: "La contraseña actual es incorrecta" }};
            let persisted = formData;
            return res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados", errorsMapped, persisted});
        }
        let errorsMapped = validationErrors.mapped();
        let persisted = formData;
        return res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados", errorsMapped, persisted});
    },


    deleteAccount: (req, res) => {
        let currentUser = req.session.userLogged;
        req.session.destroy();
        res.clearCookie("userEmail");
        db.Users.destroy({
            where: {email: currentUser.email}
        })
        .then(()=>{
            res.redirect("/cuenta/register");
        })
    }

}

module.exports = accountController;





//msg: "La dirección de correo electrónico "+formData.email_edit+" ya está registrada"