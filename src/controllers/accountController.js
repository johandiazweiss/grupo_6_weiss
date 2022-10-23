const fs = require("fs");
const path = require("path");

const accountController = {
    loginView: (req, res) => {
        res.render("./accountViews/login_weiss.ejs", { title: "Login | Weiss Ahumados" });

    },
    registerView: (req, res) => {
        res.render("./accountViews/registro_weiss.ejs", { title: "Registrarse | Weiss Ahumados" });

    },

    createUser: (req, res) => {
        let formData = req.body;
        let usersJson = fs.readFileSync(path.resolve(__dirname, "../database/usersData.json"), { encoding: "utf-8" });
        let usersList;
        usersJson == "" ? usersList = [] : usersList = JSON.parse(usersJson);
        if (usersList == "") {
            let newUser = {
                id: 1,
                first_name: formData.firstName_register,
                last_name: formData.lastName_register,
                birth_date: formData.birthDate_register,
                email: formData.email_register,
                password: formData.password,
                password_check: formData.passwordCheck,
                newsletter: formData.newsletter
            }
            usersList.push(newUser);
            fs.writeFileSync(path.resolve(__dirname, "../database/usersData.json"), JSON.stringify(usersList));
            res.redirect("/");
        }

        else {
            let newUser = {
                id: usersList.length + 1,
                first_name: formData.firstName_register,
                last_name: formData.lastName_register,
                birth_date: formData.birthDate_register,
                email: formData.email_register,
                password: formData.password,
                password_check: formData.passwordCheck,
                newsletter: formData.newsletter_register
            }
            usersList.push(newUser);
            fs.writeFileSync(path.resolve(__dirname, "../database/usersData.json"), JSON.stringify(usersList));
            res.redirect("/");
        }




    }

}

module.exports = accountController;