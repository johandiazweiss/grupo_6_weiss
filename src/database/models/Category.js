module.exports = (sequelize, DataTypes) => {
    let alias = "Categories";

    let cols = {
        id: {
            type: DataTypes.TINYINT(10),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            unique: true
        }
    }

    let config = {
        tableName:"categories",
        timestamps: false,    
    }

    const Category = sequelize.define(alias, cols, config)

    Category.associate = (models)=>{
        Category.hasMany(models.Products, {
            foreignKey: "category_id",
            as: "products"
        })
    }
    return Category;

}
