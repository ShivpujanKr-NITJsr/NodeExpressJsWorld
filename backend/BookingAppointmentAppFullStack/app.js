const express=require('express')
const path=require('path')
const cors = require('cors');
const app=express();
const addingRoute=require('./router/addinguser')
// const gettingRoute=require('./router/addinguser')
const bodyParser=require('body-parser')


app.use(cors())
// app.use(express.static(path.join(__dirname,'public')))

app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}))
app.use('/',addingRoute)

// app.use('/',(req,res,next)=>{
//     console.log(req.body)
// })

app.listen(3000,()=>console.log('hey i am listening you'))