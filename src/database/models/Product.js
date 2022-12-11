module.exports = (sequelize, DataTypes) => {
    let alias = "Products";

    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        price: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER(11),
        },
        offer_twoForOne: {
            type: DataTypes.BOOLEAN
        },
        offer_threeForTwo: {
            type: DataTypes.BOOLEAN
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        crafting_info: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        additional_info: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        image_1: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        image_2: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        category_id: {
            type: DataTypes.TINYINT(10),
            allowNull: false
        }
    }

    let config = {
        tableName:"products",
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at"
        
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models)=>{
        Product.belongsTo(models.Categories, {
            foreignKey: "category_id",
            as: "categories"
        })
    }
    

    return Product;

}
