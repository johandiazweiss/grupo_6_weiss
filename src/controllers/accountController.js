const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const db = require("../database/models/index.js");




const accountController = {
    registerView: (req, res) => {
        res.render("./accountViews/registro_weiss.ejs", { title: "Registrarse | Weiss Ahumados" });

    },
    createUser: (req, res) => {
        let validationErrors = validationResult(req);
        let formData = req.body
        if(validationErrors.isEmpty()){
            db.Users.findOne({
                where: {email: formData.email_register}
            })
            .then((email)=>{
                if(email){
                    let errorsMapped = {emailAlreadyRegistered: {msg: "El correo electrónico ingresado ya está registrado. Por favor, ingresá a tu cuenta"}};
                    let persisted = req.body
                    res.render("./accountViews/registro_weiss.ejs", { title: "Registrarse | Weiss Ahumados", errorsMapped, persisted});
                }
                else{
                    db.Users.create({
                        include: [{association: "roles"}],
                        first_name: formData.firstName_register,
                        last_name: formData.lastName_register,
                        birth_date: formData.birthDate_register,
                        email: formData.email_register,
                        password: bcrypt.hashSync(formData.password_register, 12),
                        newsletter: formData.newsletter_register,   
                    })
                    .then(()=>{
                        db.Users.findOne({
                            include: [{association: "roles"}],
                            where:{email: formData.email_register}
                        })
                        .then((userCreated)=>{
                            req.session.userLogged = userCreated;
                            res.redirect("/");
                        })
                        .catch(()=>{
                            res.send("Error: Algo salió mal");
                        }) 
                    })
                    .catch(()=>{
                        res.send("Error: Algo salió mal");
                    })  
                }
            })
            .catch(()=>{
                res.send("Error: Algo salió mal");
            })   
        }
        else{
            let errorsMapped = validationErrors.mapped(); 
            let persisted = req.body;
            res.render("./accountViews/registro_weiss.ejs", { title: "Registrarse | Weiss Ahumados", errorsMapped, persisted});
        }
    },

 //--------------------------------------------login---------------------------------------   
    loginView: (req, res) => {
        res.render("./accountViews/login_weiss.ejs", { title: "Login | Weiss Ahumados" });
    },
    login: (req, res)=>{
        let formData = req.body;
        let validationErrors = validationResult(req);
        if(validationErrors.isEmpty()){
            db.Users.findOne({
                include: [{association: "roles"}],
                where: {email: formData.email_login}
            })
            .then((user)=>{
                if(user){
                    if(bcrypt.compareSync(formData.password_login, user.password)){
                        req.session.userLogged = user;
                        formData.rememberUser_login == "on"? res.cookie("userEmail", formData.email_login, {maxAge: (1000*60)*1440}): "";
                        res.redirect("/");
                    }
                    else{
                        let errorsMapped = {loginError: {msg: "Comprueba tu contraseña y correo electrónico e inténtalo de nuevo."}};
                        let persisted = req.body;
                        res.render("./accountViews/login_weiss.ejs", { title: "Login | Weiss Ahumados", errorsMapped, persisted}); 
                    }
                }
                else{
                    let errorsMapped = {loginError: {msg: "Comprueba tu contraseña y correo electrónico e inténtalo de nuevo."}};
                    let persisted = req.body;
                    res.render("./accountViews/login_weiss.ejs", { title: "Login | Weiss Ahumados", errorsMapped, persisted});
                }
            })
            .catch(()=>{
                res.send("Error: Algo salió mal");
            })
        }
        else{
            let errorsMapped = validationErrors.mapped();
            let persisted = req.body;
            res.render("./accountViews/login_weiss.ejs", { title: "Login | Weiss Ahumados", errorsMapped, persisted});
        } 
    },
    logout: (req, res)=>{
        req.session.destroy();
        res.clearCookie("userEmail");
        res.redirect("/cuenta/login"); 
    },
    accountDetailsView: (req, res)=>{
        res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados"});
    },

    editAccount: (req, res)=>{
        let formData = req.body;
        let validationErrors = validationResult(req);
        if(validationErrors.isEmpty()){
            return res.send("user info edited");
        }
        let errorsMapped = validationErrors.mapped(); 
        let persisted = req.body;
        res.render("./accountViews/myAccount_weiss.ejs", { title: "Mi cuenta | Weiss Ahumados", errorsMapped, persisted});
    },




    
    changePassword: (req, res)=>{
        res.send("put change password");
    },
    deleteAccount: (req, res)=>{
        res.send("delete account");
    }

}

module.exports = accountController;





