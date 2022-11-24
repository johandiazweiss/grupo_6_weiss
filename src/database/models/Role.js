module.exports = (sequelize, DataTypes) => {
    let alias = "Roles";

    let cols = {
        id: {
            type: DataTypes.TINYINT(5),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
        }
    }

    let config = {
        tableName:"roles",
        timestamps: false,    
    }

    const Role = sequelize.define(alias, cols, config)

    Role.associate = (models)=>{
        Role.hasMany(models.Users, {
            foreignKey: "role_id",
            as: "users"
        })

    }
    
    return Role;

}
