const sequelize=require('sequelize')

// require('dotenv').configure()
const Sequelize=new sequelize(process.env.DB_NAME,process.env.USER,process.env.DB_PASSWD,{
    host:process.env.MY_HOST,
    dialect:'mysql',
    logging:false
})


module.exports=Sequelize;