const accountController = {
    loginView: (req, res)=>{
        res.render ("./login_weiss.ejs");

    },
    registerView: (req, res)=>{
        res.render ("./registro_weiss.ejs");

    }

}

module.exports = accountController;