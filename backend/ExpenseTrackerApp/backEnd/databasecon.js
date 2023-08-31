const sequelize=require('sequelize')

const Sequelize=new sequelize('practice_db','root','root',{
    host:'localhost',
    dialect:'mysql'
})


module.exports=Sequelize;