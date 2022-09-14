const express = require("express");
const app = express();
const path = require("path");

//---------------Recursos estáticos----
app.use(express.static(path.resolve (__dirname , "../public")));
//---------------Ejs config--------
app.set("view engine", "ejs");
app.set("views", "./src/views/");

//-------------configuración body-parser-----
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//---------------Servidor local-----

app.listen(3000, ()=>console.log ("Server running on port 3000"));

//---------------Routing-----

const mainRouter = require("./routes/mainRouter");
const productsRouter = require("./routes/productsRouter");
const accountRouter = require("./routes/accountRouter");
const shoppingRouter = require("./routes/shoppingRouter");

app.use("/", mainRouter);
app.use("/productos", productsRouter);
app.use("/cuenta", accountRouter);
app.use("/carrito", shoppingRouter);

//----------------error (404)--------------------------

app.use((req, res, next) =>{
    res.status(404).render("./mainViews/error-notFoundView_weiss.ejs")
});


