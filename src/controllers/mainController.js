const mainController = {
    homeView: (req, res) => {
        res.render("./home_weiss.ejs");
    },
    enviosView: (req, res) => {
        res.render("./envios_weiss.ejs");
    },
    wishlistView: (req, res) => {
        res.render("./wishlist_weiss.ejs");
    },

    nosotrosView: (req, res) => {
        res.render("./nosotros_weiss.ejs");
    }, 
    terminos_condicionesView: (req, res) =>{
        res.render("./terms-conditions_weiss.ejs");

    },

    contacto: (req, res) => {},
    sucursales: (req, res) => {},
    search: (req, res) => {},

}

module.exports = mainController;