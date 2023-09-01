const express=require('express')
const cors=require('cors')
const app=express();
const {Expense,User,Premium}=require('./models')
const router =require('./routes');
const sequelize = require('./databasecon');
require('dotenv').config();
app.use(express.json())
app.use(cors())

app.use('/',router)

User.hasMany(Expense);
User.hasMany(Premium)
Expense.belongsTo(User);
Premium.belongsTo(User)

sequelize.sync({alter:true})

app.listen(3000,()=>console.log('hey i am server'))