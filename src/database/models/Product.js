module.exports = (sequelize, dataTypes) => {
    let alias = "Product"
    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.VARCHAR(100),
            allowNull: false
        },
        offers: {
            type: DataTypes.VARCHAR(30)
        },
        price: {
            type: DataTypes.DECIMAL(6,2),
            allowNull: false
        },
        description: {
            type: DataTypes.VARCHAR(500),
        },
        discount: {
            type: DataTypes.INTEGER(11),
            allowNull:true
        }
    }
    let config = {
        tableName: "Products",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
    const Product = sequelize.define(alias, cols, config)
    return Product;
}