const express=require('express');
const controllers=require('./controllers')
const router=express.Router();


router.post('/user/signup',controllers.creating)

module.exports=router;