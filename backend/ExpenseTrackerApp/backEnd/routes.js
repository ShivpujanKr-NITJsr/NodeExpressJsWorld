const express=require('express');
const controllers=require('./controllers')
const router=express.Router();


router.post('/user/signup',controllers.creating)

router.post('/user/login',controllers.logging)

module.exports=router;