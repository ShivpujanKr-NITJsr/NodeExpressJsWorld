const express=require('express');
const bodyParser=require('body-parser')

const app=express();

const loginRoutes=require('./routes/login');
const messageRoute=require('./routes/message')


app.use(bodyParser.urlencoded({extended: false}));

app.use(loginRoutes)
app.use(messageRoute);



app.listen(3000)