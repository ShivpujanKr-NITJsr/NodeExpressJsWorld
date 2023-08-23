const express=require('express');
const expenseRouter=require('./routers/routes')
// const bodyParser=require('body-parser')

const cors = require('cors');

const app=express();

app.use(cors())

app.use(express.json());
app.use('/',expenseRouter)

app.listen(3000,()=>{
    console.log('hey guys i created this api that is fully working')
})