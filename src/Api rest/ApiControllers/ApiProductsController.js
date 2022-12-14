const path = require('path');
const db = require('../../database/models/index');
const { Op } = require("sequelize");


let ApiProductsController = {
    'list': (req, res) => {
        db.Products.findAll({
            include: [{ association: "categories" }]
        })
            .then(products => {
                res.status(200).json({
                    meta: {
                        status: 200,
                        total_items: products.length,
                        url: req.originalUrl
                    },
                    data: {
                        0: products
                    }
                })
            })
    },

    'detail': (req, res) => {
        db.Products.findByPk(req.params.id, {
            include: [{ association: "categories" }]
        })
            .then(product=> {
                res.status(200).json({
                    meta: {
                        status: 200,
                        url: req.originalUrl
                    },
                    data: {
                        0: product
                    }
                })
            });
    },

    "store": (req, res) => {
         db.Products.create(req.body)
        .then(product =>{
            res.status(200).json({
                meta: {
                    status: 200,
                    info: "Product created",
                    url: req.originalUrl
                },
                data: {
                    0: product
                }
            })
        }) 
    },
    "delete": (req, res) => {
        db.Products.destroy({
            where: {id: req.params.id}
        })
        .then(product =>{
            res.status(200).json({
                meta: {
                    status: 200,
                    info: "Product deleted",
                    url: req.originalUrl
                },
                data: {
                    0: product
                }
            })
        })
    }






}


module.exports = ApiProductsController;




