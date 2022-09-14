const fs = require("fs");
const path = require("path");

let productosJSON = fs.readFileSync(path.resolve(__dirname, "../database/productsData.json"), { encoding: "utf-8" });




const productsController = {
    productsView: (req, res) => {
        res.render("./productsViews/productos_weiss.ejs", {title: "Nuestros Productos | Weiss Ahumados"});
    },
    productDetailView: (req, res) => {
        let productId = req.params.id;
        res.render("./productsViews/productDetail_weiss.ejs", { text: "DETALLE DEL PRODUCTO " + productId, title: "Producto | Weiss Ahumados"});
    },
    productsCategoryView: (req, res) => {
        let productsCategory = req.params.categoria;
        res.render("./productsViews/productsCategory_weiss.ejs", { text: "AQUÍ IRAN LOS PRODUCTOS DE LA CATEGORÍA " + productsCategory, title: "Categoría | Weiss Ahumados" });

    },


    productsCreateView: (req, res) => {
        res.render("./productsViews/createProductForm_weiss.ejs", {title: "admin"});
    },

    createProduct: (req, res) => {
        let productData = req.body;
        let productList;
        let imageFileName;
        req.file == undefined? imageFileName = "default.jpg": imageFileName = req.file.filename;
        
        if (productosJSON == "") {
            productList = [];
            let newProduct= {
                id: 1,
                title: productData.product_title,
                price: productData.product_price,
                description: productData.product_description,
                image: imageFileName,
                category: productData.product_category,
                offers: productData.product_offers,
                crafting: productData.product_crafting,
                addinfo: productData.product_additionalInfo
            }
            productList.push(newProduct);
            fs.writeFileSync(path.resolve(__dirname, "../database/productsData.json"), JSON.stringify(productList));
            res.redirect("/productos");
        }
        else{
            productList = JSON.parse(productosJSON);
            let newProduct= {
                id: productList.length+1,
                title: productData.product_title,
                price: productData.product_price,
                description: productData.product_description,
                image: imageFileName,
                category: productData.product_category,
                offers: productData.product_offers,
                crafting: productData.product_crafting,
                addinfo: productData.product_additionalInfo
            }
            productList.push(newProduct);
            fs.writeFileSync(path.resolve(__dirname, "../database/productsData.json"), JSON.stringify(productList));
            res.redirect("/productos");
        }
    },

    productsEditView: (req, res)=>{
        res.render("./productsViews/editProductForm_weiss.ejs", {title: "admin"});
    }
}

module.exports = productsController;