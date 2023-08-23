const Sequelize = require('sequelize');

const sequelize = require('../utils/database')

const User = sequelize.define('user',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true
  },

  username:{
    type: Sequelize.STRING,
    allowNull:false
  },

  phone:{
    type:Sequelize.NUMBER,
    allowNull:false
  } ,

  email:{
    type: Sequelize.STRING,
    allowNull:false
  }
 
})

module.exports=User;