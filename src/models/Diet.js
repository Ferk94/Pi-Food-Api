const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  return sequelize.define("Diet", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }) 
}