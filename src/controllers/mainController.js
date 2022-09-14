const mainController = {
    homeView: (req, res) => {
        res.render("./mainViews/home_weiss.ejs", {title: "Home | Weiss ahumados"});
    },
    enviosView: (req, res) => {
        res.render("./mainViews/envios_weiss.ejs", {title: "Envíos a todo el país | Weiss Ahumados"});
    },
    wishlistView: (req, res) => {
        res.render("./shoppingViews/wishlist_weiss.ejs", {title: "Tus deseos | Weiss Ahumados"});
    },

    nosotrosView: (req, res) => {
        res.render("./mainViews/nosotros_weiss.ejs", {title: "¿Quiénes somos? | Weiss Ahumados"});
    }, 
    terminos_condicionesView: (req, res) =>{
        res.render("./mainViews/terms-conditions_weiss.ejs", {title: "Terminos & condiciones | Weiss Ahumados"});

    },

    contacto: (req, res) => {},
    sucursales: (req, res) => {},
    search: (req, res) => {},

}

module.exports = mainController;