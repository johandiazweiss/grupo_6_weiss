const {check} = require("express-validator");

 
const formValidations = {
    registerValidations : [
        check("firstName_register").notEmpty().withMessage("Este campo es obligatorio"),
        check("lastName_register").notEmpty().withMessage("Este campo es obligatorio"),
        check("birthDate_register").notEmpty().withMessage("Este campo es obligatorio"),
        check("email_register").notEmpty().withMessage("Este campo es obligatorio").isEmail().withMessage("Ingrese un correo electrónico válido"),
        check("password_register").notEmpty().withMessage("Este campo es obligatorio").isLength({min: 8}).withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
        check("passwordCheck_register").notEmpty().withMessage("Este campo es obligatorio").custom((value, {req})=>{
            let formData = req.body;
            if (formData.password_register != formData.passwordCheck_register){
                throw new Error("Las contraseñas no coinciden");
            }
            else{
                return true
            }
        })
        


    ],
    loginValidations : [
        check("email_login").notEmpty().withMessage("Email requerido").isEmail().withMessage("Email requerido"),
        check("password_login").notEmpty().withMessage("Contraseña requerida")
    ],

    editAccountValidations : [
        check("firstName_edit").notEmpty().withMessage("Este campo es obligatorio"),
        check("lastName_edit").notEmpty().withMessage("Este campo es obligatorio"),
        check("birthDate_edit").notEmpty().withMessage("Este campo es obligatorio"),
        check("email_edit").notEmpty().withMessage("Este campo es obligatorio").isEmail().withMessage("Ingrese un correo electrónico válido"),
    ],
  /*   changePasswordValidations: [
        check("password_edit").notEmpty().withMessage("Este campo es obligatorio").isLength({min: 8}).withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
        check("passwordCheck_edit").notEmpty().withMessage("Este campo es obligatorio").custom((value, {req})=>{
            let formData = req.body;
            if (formData.password_edit != formData.passwordCheck_edit){
                throw new Error("Las contraseñas no coinciden");
            }
            else{
                return true
            }
        })
    ] */


} 



module.exports = formValidations;