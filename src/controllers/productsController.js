
const { validationResult } = require("express-validator");
const db = require("../database/models/index.js");



const productsController = {
    productsView: (req, res) => {
        let page  = req.query.page;
        let limit = parseInt(req.query.lim);
        let offset = parseInt(req.query.off);
        
        if(page == undefined){
            return db.Products.findAll({
                include: [{ association: "categories" }],
                limit: 8,
                offset: 0
                
            })
            .then(products=>{
                if(products.length == 0){
                    return res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos",  title: "Nuestros Productos | Weiss Ahumados"});
                }
                //res.send(products)
                return res.render("./productsViews/productos_weiss.ejs", { title: "Nuestros Productos | Weiss Ahumados", products}); 
            }) 
            
        }
        return db.Products.findAll({
            include: [{ association: "categories" }],
            limit: limit,
            offset: offset
        })
        .then(products=>{
            if(products.length == 0){
                return res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos", title:  " Productos | Weiss Ahumados" });
            }
            return res.render("./productsViews/productos_weiss.ejs", { title: "Nuestros Productos | Weiss Ahumados", products, page}); 
        })   
       

 
    },



    productDetailView: (req, res) => {
        let productId = req.params.id;
        db.Products.findByPk(productId)
        .then(productFinded=>{
            if(!productFinded){
                return res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos", title: "Producto no encontrado | Weiss Ahumados" });
            }
            return  res.render("./productsViews/productDetail_weiss.ejs", { productFinded, title: productFinded.title + " | Weiss Ahumados" })
        })
    },





    productsCategoryView: (req, res) => {
        let productsCategory = req.params.categoria;
        db.Products.findAll({
            include: [{ association: "categories",  where: {name: productsCategory}}]
            
        })
        .then(productsOfCategory=>{
            if(productsOfCategory.length == 0){
                return res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos", title: productsCategory + " | Weiss Ahumados" });
            }
            return res.render("./productsViews/productsCategory_weiss.ejs", {  title: productsCategory + " | Weiss Ahumados", productsOfCategory, productsCategory});
        })
    },


    productsCreateView: (req, res) => {
        db.Categories.findAll()
            .then(categories => {
                res.render("./productsViews/createProductForm_weiss.ejs", { title: "admin", categories });
            })
    },

    createProduct: (req, res) => {
        let productData = req.body;
        let validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) {
            let img1 = req.files.product_image1 ? req.files.product_image1[0].filename : "default.png" ;
            let img2 = req.files.product_image1 ? req.files.product_image1[0].filename : "default.png" ;
            return db.Products.create({
                name: productData.product_title,
                category_id: productData.product_category,
                description: productData.product_description,
                crafting_info: productData.product_crafting,
                additional_info: productData.product_additionalInfo,
                offer_twoForOne: productData.product_offer == 2,
                offer_threeForTwo: productData.product_offer == 3,
                price: productData.product_price,
                image_1: img1,
                image_2: img2,
                discount: productData.product_discount
            })
            .then(product=>{
                res.redirect("/")
            })   
        }
        return db.Categories.findAll()
        .then(categories => {
            let errorsMapped = validationErrors.mapped();
            let persistedData = req.body;
            res.render("./productsViews/createProductForm_weiss.ejs", { title: "admin", categories, errorsMapped, persistedData });
        })
    },


    productsEditView: (req, res) => {
        let productId = req.params.id;
        let productList;
        productosJSON == "" ? productList = [] : productList = JSON.parse(productosJSON);
        let productFinded = productList.find(product => product.id == productId);
        res.render("./productsViews/editProductForm_weiss.ejs", { title: "admin", productId, productFinded });
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






//req.files.product_image1[0].filename