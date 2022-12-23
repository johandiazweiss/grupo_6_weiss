const express = require("express");
const app = express();
const path = require("path");

const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require('cookie-parser')
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware.js");
const userInCookieMiddleware = require("./middlewares/userInCookieMiddleware.js");
const adminLoggedMiddleware = require("./middlewares/adminLoggedMiddleware.js");

//---------------Recursos estáticos----
app.use(express.static(path.resolve (__dirname , "../public")));
//---------------Ejs config--------
app.set("view engine", "ejs");
app.set("views", "./src/views/");

//-------------configuración body-parser-----
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//----------------------method-override------

app.use(methodOverride ("_method"));


//---------------Servidor local-----

app.listen(process.env.PORT || 3000, ()=>console.log ("Server running on port 3000"));

//----------Middlewares (los más importantes)----*/




//---------------Routing-----

const mainRouter = require("./routes/mainRouter");
const productsRouter = require("./routes/productsRouter");
const accountRouter = require("./routes/accountRouter");
const shoppingRouter = require("./routes/shoppingRouter");
const ApiProductsRouter= require("./Api rest/ApiEndpoints/ApiProductsRouter");
const ApiCustomersRouter= require("./Api rest/ApiEndpoints/ApiCustomersRouter");

app.use(cookieParser());
app.use(session({secret: "weissEcommerce", saveUninitialized: false, resave: false}));
app.use(userInCookieMiddleware);


app.use(userLoggedMiddleware);
app.use(adminLoggedMiddleware);


app.use("/", mainRouter);
app.use("/productos", productsRouter);
app.use("/cuenta", accountRouter);
app.use("/carrito", shoppingRouter);

app.use("/api/productos",  ApiProductsRouter);
app.use("/api/customers", ApiCustomersRouter);




//----------------error (404)--------------------------

app.use((req, res, next) =>{
    res.status(404).render("./mainViews/error-notFoundView_weiss.ejs")
});


