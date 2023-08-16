// const http = require('http');

const express = require('express')

const app=express();

app.use((req,res,next)=>{
    console.log('in the middleware')
    next()            //allows the request to continue to the next middleware in line
})

app.use((req,res,next)=>{
    console.log('in another middleware')
    res.send('<h1> hello from express.js</h1>')
    
})

// const server = http.createServer(app);
// server.listen(4000)
app.listen(3000)