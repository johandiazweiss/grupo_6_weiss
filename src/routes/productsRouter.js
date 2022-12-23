const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const formValidations = require("../middlewares/formValidations.js");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware.js");




//---------------------multer-storage-config-------------------------
const storage = multer.diskStorage({
    destination: function (req, file, callback){
        let destinationPath = path.resolve(__dirname, "../../public/img productos_weiss/productosImages");
        callback(null, destinationPath);
    },


    filename: function (req, file, callback){
        let date = new Date();
        let imageName =  "product-img"+date.getDate()+(date.getMonth()+1)+date.getFullYear()+date.getHours()+date.getMinutes()+date.getSeconds()+file.originalname;
        callback(null, imageName);
    }
});

const upload = multer({storage});


//-------------------------------------------------------------------

const productsController = require("../controllers/productsController.js");



router.get("/page/:page", productsController.productsView);
router.get("/:categoria", productsController.productsCategoryView);
router.get("/detalle/:id", productsController.productDetailView);

router.get("/admin/create", adminAuthMiddleware, productsController.productsCreateView);
router.post("/admin/create", upload.fields([{ name: 'product_image1', maxCount: 1 }, { name: 'product_image2', maxCount: 1 }]), formValidations.createProductValidations,  productsController.createProduct);

router.get("/detalle/:id/admin/edit", adminAuthMiddleware, productsController.productsEditView);
router.put("/detalle/:id/admin/edit",  upload.fields([{ name: 'productEdit_image1', maxCount: 1 }, { name: 'productEdit_image2', maxCount: 1 }]),  formValidations.editProductValidations,  productsController.editProduct);

router.delete("/detalle/:id/admin/delete", productsController.deleteProduct);


module.exports = router;
