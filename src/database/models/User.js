module.exports = (sequelize, DataTypes) => {
    let alias = "Users";

    let cols = {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        newsletter: {
            type: DataTypes.BOOLEAN
            
            
        },
        role_id: {
            type: DataTypes.TINYINT(5),
        }



    }

    let config = {
        tableName:"customers",
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at"
        
    }

    const User = sequelize.define(alias, cols, config)

    
    User.associate = (models)=>{
        User.belongsTo(models.Roles, {
            foreignKey: "role_id",
            as: "roles"
        })
    }
    

    return User;

}
