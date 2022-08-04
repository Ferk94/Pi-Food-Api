const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
 return sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false, 
      validate: {
        isFloat: true
      }
    },
    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    },
    image: {
      type: DataTypes.STRING(25000),  
      allowNull: true
      
    },
    steps: {
      type: DataTypes.TEXT,
      allownull: false
    }

  });
};
