const express=require('express')
const cors=require('cors')
const app=express();
const {Expense,User,Premium,ForgotPassword,Filedownloaded}=require('./models')
const router =require('./routes');
const sequelize = require('./databasecon');
require('dotenv').config();

const Sib=require('sib-api-v3-sdk')




app.use(express.json())
app.use(cors())

app.use('/',router)

User.hasMany(Expense);
User.hasMany(Premium)
Expense.belongsTo(User);
Premium.belongsTo(User)

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User)

User.hasMany(Filedownloaded)
Filedownloaded.belongsTo(User)

sequelize.sync({alter:true})

app.listen(3000,()=>console.log('hey i am server'))