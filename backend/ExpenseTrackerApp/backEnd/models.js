
const sequelize=require('./databasecon')

const Sequelize=require('sequelize');

const User = sequelize.define('User',{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,

    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ispremiumuser:Sequelize.STRING,
    totalexpense:Sequelize.INTEGER
})

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps:false
}
)

const Premium= sequelize.define('premium',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    // price: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },

    paymentid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    status:Sequelize.STRING,

})

const ForgotPassword=sequelize.define('forgotpassword',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
        allowNull: false
    },
    isActive:Sequelize.BOOLEAN,
    uuid:Sequelize.STRING
})

const Filedownloaded=sequelize.define('filedownloaded',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
        allowNull: false
    },
    url:Sequelize.STRING,
    date:Sequelize.DATE
})

// Premium.sync({force:true})
module.exports={Expense,User,Premium,ForgotPassword,Filedownloaded};
