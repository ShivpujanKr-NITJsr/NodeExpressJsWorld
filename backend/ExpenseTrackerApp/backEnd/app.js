const express=require('express')
const cors=require('cors')
const app=express();

const router =require('./routes');
const sequelize = require('./databasecon');

app.use(express.json())
app.use(cors())

app.use('/',router)

sequelize.sync({alter:true})

app.listen(3000,()=>console.log('hey i am server'))