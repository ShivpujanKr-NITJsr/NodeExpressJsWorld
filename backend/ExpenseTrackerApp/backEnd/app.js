const express=require('express')
const cors=require('cors')
const app=express();
const {Expense,User}=require('./models')
const router =require('./routes');
const sequelize = require('./databasecon');

app.use(express.json())
app.use(cors())

app.use('/',router)

User.hasMany(Expense);

Expense.belongsTo(User);


sequelize.sync({alter:true})

app.listen(3000,()=>console.log('hey i am server'))