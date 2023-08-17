const express = require('express');
const bodyParser = require('body-parser');
const path=require('path')

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const contactus=require('./routes/contactus');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminRoutes);
app.use('/shop',shopRoutes);
app.use('/',contactus);
app.use((req,res,next )=>{
    
    res.status(404).sendFile(path.join(__dirname,'views','error404.html'))
})

app.listen(3000);
