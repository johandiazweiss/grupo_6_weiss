const shoppingController = {
    shoppingCartView: (req, res)=>{
        res.render ("./shoppingViews/shoppingCart_weiss.ejs", {title: "Tu carrito | Weiss Ahumados"});

    }

}

module.exports = shoppingController;