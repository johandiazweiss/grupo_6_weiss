const productsController  = {
    productsView: (req, res)=>{
        res.render("./productos_weiss.ejs")
    },
    productDetailView: (req, res)=>{
        let productId = req.params.id;
        res.render ("./productDetail_weiss.ejs", {text: "DETALLE DEL PRODUCTO "+productId});
    },
    productsCategoryView: (req, res)=>{
        let productsCategory = req.params.categoria;
        res.render("./productsCategory_weiss.ejs", {text: "AQUÍ IRAN LOS PRODUCTOS DE LA CATEGORÍA "+productsCategory});

    }
}

module.exports = productsController;