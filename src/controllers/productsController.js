const fs = require("fs");
const path = require("path");

let productosJSON = fs.readFileSync(path.resolve(__dirname, "../database/productsData.json"), { encoding: "utf-8" });

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productsController = {
    productsView: (req, res) => {
        let productosJSON = fs.readFileSync(path.resolve(__dirname, "../database/productsData.json"), { encoding: "utf-8" });
        let productsList;
        productosJSON == "" ? productsList = [] : productsList = JSON.parse(productosJSON);
        if (productsList == "") {
            res.render("./mainViews/undefinedView_weiss.ejs", { title: "Nuestros Productos | Weiss Ahumados", undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos" });
        }
        else{
            productsList.sort(function (a, b){
                if (a.title.toLowerCase() > b.title.toLowerCase()){
                    return +1;
                }
                else if(a.title.toLowerCase() < b.title.toLowerCase()){
                    return -1;
                }
                else{
                    return 0;
                }
            })
            res.render("./productsViews/productos_weiss.ejs", {productsList, title: "Nuestros Productos | Weiss Ahumados", toThousand});
        }
    },



    productDetailView: (req, res) => {
        let productosJSON = fs.readFileSync(path.resolve(__dirname, "../database/productsData.json"), { encoding: "utf-8" });
        let productId = req.params.id;
        let productList;
        productosJSON == "" ? productList = [] : productList = JSON.parse(productosJSON);
        let productFinded = productList.find(product => product.id == productId);
        if (productFinded == undefined) {
            res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos", title: "Undefined" });
        }
        else {
            res.render("./productsViews/productDetail_weiss.ejs", { productFinded, title: productFinded.title + " | Weiss Ahumados" });
        }
    },





    productsCategoryView: (req, res) => {
        let productsCategory = req.params.categoria;
        let productosJSON = fs.readFileSync(path.resolve(__dirname, "../database/productsData.json"), { encoding: "utf-8" });
        let productsList;
        productosJSON == "" ? productsList = [] : productsList = JSON.parse(productosJSON);
        let productsOfCategory = productsList.filter(product=>{
            return product.category == productsCategory;
        })
        if (productsOfCategory == "") {
            res.render("./mainViews/undefinedView_weiss.ejs", { title: "Nuestros Productos | Weiss Ahumados", undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos" });
        }
        else{
            productsOfCategory.sort(function (a, b){
                if (a.title.toLowerCase() > b.title.toLowerCase()){
                    return +1;
                }
                else if(a.title.toLowerCase() < b.title.toLowerCase()){
                    return -1;
                }
                else{
                    return 0;
                }
            })
            res.render("./productsViews/productsCategory_weiss.ejs", { productsOfCategory, productsCategory, title: productsCategory+" | Weiss Ahumados", toThousand });
        }
    },


    productsCreateView: (req, res) => {
        res.render("./productsViews/createProductForm_weiss.ejs", { title: "admin" });
    },

    createProduct: (req, res) => {
        let productData = req.body;
        let productList;
        let imageFileName;
        req.file == undefined ? imageFileName = "default.png" : imageFileName = req.file.filename;

        if (productosJSON == "") {
            productList = [];
            let newProduct = {
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
        else {
            productList = JSON.parse(productosJSON);
            let newProduct = {
                id: productList.length + 1,
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

    productsEditView: (req, res) => {
        let productId = req.params.id;
        let productList;
        productosJSON == "" ? productList = [] : productList = JSON.parse(productosJSON);
        let productFinded = productList.find(product => product.id == productId);
        res.render("./productsViews/editProductForm_weiss.ejs", {  title: "admin",  productId, productFinded });
    },

    editProduct: (req, res) => {
        let productId = req.params.id;
        let productsList = JSON.parse(productosJSON);
        let productEditData = req.body;

        let productToEdit = productsList.find(product => product.id == productId);
        productToEdit = {
            id: productToEdit.id,
            title: productEditData.edit_title,
            price: productEditData.edit_price,
            description: productEditData.edit_description,
            image: req.file == undefined ? productToEdit.image : req.file.filename,
            category: productEditData.edit_category,
            offers: productEditData.edit_offers,
            crafting: productEditData.edit_crafting,
            addinfo: productEditData.edit_additionalInfo
        }

        productsList[productToEdit.id - 1] = productToEdit;
        fs.writeFileSync(path.resolve(__dirname, "../database/productsData.json"), JSON.stringify(productsList));
        res.redirect("/productos/detalle/" + productId);
        /* 
                let newProductsList = productsList.map(product => {
                    if (product.id == productToEdit.id) {
                        return product = {...productToEdit};
                    }
                    else{
                        return product;
                    }
                }) */
    },
    deleteProduct: (req, res) => {
        let productosJSON = fs.readFileSync(path.resolve(__dirname, "../database/productsData.json"), { encoding: "utf-8" });
        let productId = req.params.id;
        let productsList = JSON.parse(productosJSON);
        let updatedProductList = productsList.filter(product => product.id != productId);
        for (let i = 0; i < updatedProductList.length; i++) {
            updatedProductList[i].id = i + 1;
        }
        fs.writeFileSync(path.resolve(__dirname, "../database/productsData.json"), JSON.stringify(updatedProductList));
        res.redirect("/productos/detalle/" + productId);
 

    }
}

module.exports = productsController;