
const { validationResult } = require("express-validator");
const db = require("../database/models/index.js");

let formatter = new Intl.NumberFormat('es-ar', {
    style: 'currency',
    currency: 'ARS',
})



const productsController = {
    productsView: (req, res) => {
        let ord = req.query.orderby;
        let op = req.query.op;
        let page = req.params.page;
        let limit;
        let offset;
        switch (page) {
            case "1":
                limit = 8
                offset = 0
                break;
            case "2":
                limit = 8
                offset = 8
                break;
            case "3":
                limit = 8
                offset = 16
                break;
            case "4":
                limit = 8
                offset = 24
                break;
            case "5":
                limit = 8
                offset = 32
                break;
            default:
                limit = 0
                offset = 0
        }
        if (limit == 0 && offset == 0) {
            return res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos", title: "Nuestros Productos | Weiss Ahumados" });      
        }
        if(ord != undefined){
            return db.Products.findAll({
                include: [{ association: "categories" }],
                order: [[ord, op]],
                limit: limit,
                offset: offset,
                
            })
                .then(products => {
                    if (products.length == 0) {
                        return res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos", title: " Productos | Weiss Ahumados" });
                    }
                    return res.render("./productsViews/productos_weiss.ejs", { title: "Nuestros Productos | Weiss Ahumados", products, page, formatter, ord, op });
                })
                .catch(() => {
                    res.send("Error: Algo salió mal");
                })
        }
        return db.Products.findAll({
            include: [{ association: "categories" }],
            limit: limit,
            offset: offset,
            order: [["name", 'ASC']],
            
        })
            .then(products => {
                if (products.length == 0) {
                    return res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos", title: " Productos | Weiss Ahumados" });
                }
                return res.render("./productsViews/productos_weiss.ejs", { title: "Nuestros Productos | Weiss Ahumados", products, page, formatter, ord});
            })
            .catch(() => {
                res.send("Error: Algo salió mal");
            })
    },



    productDetailView: (req, res) => {
        let productId = req.params.id;
        db.Products.findByPk(productId, { include: [{ association: "categories" }] })
            .then(productFinded => {
                if (!productFinded) {
                    return res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos", title: "Producto no encontrado | Weiss Ahumados" });
                }
                return res.render("./productsViews/productDetail_weiss.ejs", { productFinded, title: productFinded.name + " | Weiss Ahumados", formatter })
            })
            .catch(() => {
                res.send("Error: Algo salió mal");
            })
    },





    productsCategoryView: (req, res) => {
        let productsCategory = req.params.categoria;
        let ord = req.query.orderby ? req.query.orderby : "name";
        let op = req.query.op ? req.query.op : "asc"
        console.log(op)
        console.log(ord)
        db.Products.findAll({
            include: [{ association: "categories", where: { name: productsCategory } }],
            order: [[ord, op]],

        })
            .then(productsOfCategory => {
                if (productsOfCategory.length == 0) {
                    return res.render("./mainViews/undefinedView_weiss.ejs", { undefinedText: "Producto indefinido/No se encuentran productos cargados en la base de datos", title: productsCategory + " | Weiss Ahumados" });
                }
                return db.Categories.findOne({
                    where: {name: productsCategory}
                })
                .then(categoryTitle =>{
                    
                    return res.render("./productsViews/productsCategory_weiss.ejs", { title: productsCategory + " | Weiss Ahumados", productsOfCategory, productsCategory, formatter, categoryTitle, op, ord }); 
                })
                
            })
            .catch(() => {
                res.send("Error: Algo salió mal");
            })
    },


    productsCreateView: (req, res) => {
        db.Categories.findAll()
            .then(categories => {
                res.render("./productsViews/createProductForm_weiss.ejs", { title: "admin", categories });
            })
            .catch(() => {
                res.send("Error: Algo salió mal");
            })
    },

    createProduct: (req, res) => {
        let productData = req.body;
        let validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) {
            let img1 = req.files.product_image1 ? req.files.product_image1[0].filename : "default.png";
            let img2 = req.files.product_image2 ? req.files.product_image2[0].filename : "default.png";
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
                .then(product => {
                    res.redirect("/productos/detalle/"+product.id)
                })
                .catch(() => {
                    res.send("Error: Algo salió mal");
                })
        }
        return db.Categories.findAll()
            .then(categories => {
                let errorsMapped = validationErrors.mapped();
                let persistedData = req.body;
                res.render("./productsViews/createProductForm_weiss.ejs", { title: "admin", categories, errorsMapped, persistedData });
            })
            .catch(() => {
                res.send("Error: Algo salió mal");
            })
    },




    productsEditView: (req, res) => {
        let productId = req.params.id;
        let product = db.Products.findByPk(productId, { include: [{ association: "categories" }] })
        let allCategories = db.Categories.findAll()
        return Promise.all([product, allCategories])
        .then(([productToEdit, categories])=>{
            res.render("./productsViews/editProductForm_weiss.ejs", { title: "admin", productToEdit, categories });
        })
        .catch(() => {
            res.send("Error: Algo salió mal");
        }) 
    },

    editProduct: (req, res) => {
        let productId = req.params.id;
        let editedData = req.body;
        let validationErrors = validationResult(req);
        if (validationErrors.isEmpty()) {
            return db.Products.findByPk(productId)
            .then(product => {
            let img1 = req.files.productEdit_image1 ? req.files.productEdit_image1[0].filename : product.image_1;
            let img2 = req.files.productEdit_image2 ? req.files.productEdit_image2[0].filename : product.image_2;  
            db.Products.update({
                name: editedData.productEdit_title,
                category_id: editedData.productEdit_category,
                description: editedData.productEdit_description,
                crafting_info: editedData.productEdit_crafting,
                additional_info: editedData.productEdit_additionalInfo,
                offer_twoForOne: editedData.productEdit_offer == 2,
                offer_threeForTwo: editedData.productEdit_offer == 3,
                price: editedData.productEdit_price,
                image_1: img1,
                image_2: img2,
                discount: editedData.productEdit_discount
            }, {where: {id: productId}})
            .then(product => {
                res.redirect("/productos/detalle/"+productId)
            })
            .catch(() => {
                res.send("Error: Algo salió mal");
            }) 
        })
        }
        let product = db.Products.findByPk(productId, { include: [{ association: "categories" }] })
        let allCategories = db.Categories.findAll()
        return Promise.all([product, allCategories])
        .then(([productToEdit, categories])=>{
            let errorsMapped = validationErrors.mapped();
            let persistedData = req.body;
            res.render("./productsViews/editProductForm_weiss.ejs", { title: "admin",  productToEdit,  categories ,persistedData, errorsMapped });
        })
        .catch(() => {
            res.send("Error: Algo salió mal");
        })          
    },



    deleteProduct: (req, res) => {
        let productId = req.params.id;
        db.Products.destroy({
            where:{id: productId}
        })
        .then(()=>{
            return res.redirect("/productos/page/1");
        })
        .catch(() => {
            res.send("Error: Algo salió mal");
        })  

        


    }
}

module.exports = productsController;






