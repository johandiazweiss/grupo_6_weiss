const { check } = require("express-validator");
const db = require("../database/models/index.js");



const formValidations = {
    registerValidations: [
        check("firstName_register").notEmpty().withMessage("Este campo es obligatorio"),
        check("lastName_register").notEmpty().withMessage("Este campo es obligatorio"),
        check("birthDate_register").notEmpty().withMessage("Este campo es obligatorio"),
        check("email_register").notEmpty().withMessage("Este campo es obligatorio").isEmail().withMessage("Ingrese un correo electrónico válido"),
        check("password_register").notEmpty().withMessage("Este campo es obligatorio").isLength({ min: 8 }).withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
        check("passwordCheck_register").notEmpty().withMessage("Este campo es obligatorio").custom((value, { req }) => {
            let formData = req.body;
            if (formData.password_register != formData.passwordCheck_register) {
                throw new Error("Las contraseñas no coinciden");
            }
            else {
                return true
            }
        })



    ],
    loginValidations: [
        check("email_login").notEmpty().withMessage("Email requerido").isEmail().withMessage("Email requerido"),
        check("password_login").notEmpty().withMessage("Contraseña requerida")
    ],

    editAccountValidations: [
        check("firstName_edit").notEmpty().withMessage("Este campo es obligatorio"),
        check("lastName_edit").notEmpty().withMessage("Este campo es obligatorio"),
        check("birthDate_edit").notEmpty().withMessage("Este campo es obligatorio"),
        check("email_edit").notEmpty().withMessage("Este campo es obligatorio").isEmail().withMessage("Ingrese un correo electrónico válido"),
    ],
    changePasswordValidations: [

        check("oldPassword_edit").notEmpty().withMessage("Debes llenar todos los campos para cambiar la contraseña"),
        check("newPassword_edit").notEmpty().withMessage("Debes llenar todos los campos para cambiar la contraseña").isLength({ min: 8 }).withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
        check("newPasswordCheck_edit").notEmpty().withMessage("Debes llenar todos los campos para cambiar la contraseña").custom((value, { req }) => {
            let formData = req.body;
            if (formData.newPassword_edit != formData.newPasswordCheck_edit) {
                throw new Error("Las contraseñas no coinciden");
            }
            else {
                return true
            }
        })
    ],

    createProductValidations: [
        check("product_title").notEmpty().withMessage("Este campo es obligatorio").custom((value, { req }) => {
            return db.Products.findOne({
                where: { name: req.body.product_title }
            })
            .then((product) => {
            if (product) {
                throw new Error("Ya existe un producto con este nombre en la base de datos");
            }
            else {
                return true
            }
            }) 
        }), 
        check("product_category").notEmpty().withMessage("Este campo es obligatorio"),
        check("product_description").notEmpty().withMessage("Este campo es obligatorio").isLength({ max: 500 }).withMessage("Máximo: 500 caracteres"),
        check("product_crafting").notEmpty().withMessage("Este campo es obligatorio").isLength({ max: 500 }).withMessage("Máximo: 500 caracteres"),
        check("product_additionalInfo").notEmpty().withMessage("Este campo es obligatorio").isLength({ max: 300 }).withMessage("Máximo: 300 caracteres"),

        check("product_price").notEmpty().withMessage("Este campo es obligatorio").isFloat({ max: 999999.99 }).withMessage("El máximo es 999.999"),
        check("product_image1").custom((value, { req }) => {
            if (req.files.product_image1 == undefined) {
                throw new Error("No ha seleccionado la imagen del artículo del producto");
            }
            else {
                return true
            }
        }),
        check("product_image2").custom((value, { req }) => {
            let files = req.files;
            if (files.product_image2 == undefined) {
                throw new Error("No ha seleccionado la imagen del detalle del producto");
            }
            else {
                return true
            }
        })


    ],

    editProductValidations: [
        check("productEdit_title").notEmpty().withMessage("Este campo es obligatorio").custom((value, { req }) => {
            return db.Products.findByPk(req.params.id)
            .then(product=>{
                if(product.name == req.body.productEdit_title){
                    return true
                }
                return db.Products.findOne({
                    where: { name: req.body.productEdit_title }
                })
                .then( product => {
                    if (product) {
                        throw new Error("Ya existe un producto con este nombre en la base de datos");
                    }
                    else {
                        return true
                    } 
                })
            }) 
        }), 
        check("productEdit_category").notEmpty().withMessage("Este campo es obligatorio"),
        check("productEdit_description").notEmpty().withMessage("Este campo es obligatorio").isLength({ max: 500 }).withMessage("Máximo: 500 caracteres"),
        check("productEdit_crafting").notEmpty().withMessage("Este campo es obligatorio").isLength({ max: 500 }).withMessage("Máximo: 500 caracteres"),
        check("productEdit_additionalInfo").notEmpty().withMessage("Este campo es obligatorio").isLength({ max: 300 }).withMessage("Máximo: 300 caracteres"),
        check("productEdit_price").notEmpty().withMessage("Este campo es obligatorio").isFloat({ max: 999999.99 }).withMessage("El máximo es 999.999"),
    ]


}



module.exports = formValidations;