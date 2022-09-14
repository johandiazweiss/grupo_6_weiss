const accountController = {
    loginView: (req, res)=>{
        res.render ("./accountViews/login_weiss.ejs", {title: "Login | Weiss Ahumados"} );

    },
    registerView: (req, res)=>{
        res.render ("./accountViews/registro_weiss.ejs", {title: "Registro | Weiss Ahumados"});

    }

}

module.exports = accountController;