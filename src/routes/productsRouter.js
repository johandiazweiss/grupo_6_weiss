const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");




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



router.get("/", productsController.productsView);
router.get("/:categoria", productsController.productsCategoryView);
router.get("/detalle/:id", productsController.productDetailView);

router.get("/admin/create", productsController.productsCreateView);
router.post("/admin/create", upload.single("product_image"), productsController.createProduct);

router.get("/detalle/:id/admin/edit", productsController.productsEditView);
router.put("/detalle/:id/admin/edit",  upload.single("edit_image") , productsController.editProduct);

router.delete("/detalle/:id/admin/delete", productsController.deleteProduct);


module.exports = router;
