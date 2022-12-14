const path = require('path');
const db = require('../../database/models/index');
const { Op } = require("sequelize");


let ApiCustomersController = {
    'list': (req, res) => {
        db.Users.findAll({
            include: [{ association: "roles" }]
        })
            .then(users => {
                res.status(200).json({
                    meta: {
                        status: 200,
                        total_items: users.length,
                        url: req.originalUrl
                    },
                    data: {
                        0: users
                    }
                })
            })
    },

    'detail': (req, res) => {
        db.Users.findByPk(req.params.id, {
            include: [{ association: "roles" }]
        })
            .then(user=> {
                res.status(200).json({
                    meta: {
                        status: 200,
                        url: req.originalUrl
                    },
                    data: {
                        0: user
                    }
                })
            });
    },

    "store": (req, res) => {
         db.Users.create(req.body)
        .then(user =>{
            res.status(200).json({
                meta: {
                    status: 200,
                    info: "Customer created",
                    url: req.originalUrl
                },
                data: {
                    0: user
                }
            })
        })
    },



    "delete": (req, res) => {
        db.Users.destroy({
            where: {id: req.params.id}
        })
        .then(user =>{
            res.status(200).json({
                meta: {
                    status: 200,
                    info: "Customer deleted",
                    url: req.originalUrl
                },
                data: {
                    0: user
                }
            })
        })
    }


}






 module.exports = ApiCustomersController;


