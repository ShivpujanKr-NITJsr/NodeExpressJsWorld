const express=require('express');
const controllers=require('./controllers')
const router=express.Router();


router.post('/user/signup',controllers.creating)

router.post('/user/login',controllers.logging)

router.get('/expenses',controllers.getexpenses)

router.delete('/expenses/:id',controllers.delexpenses)

router.post('/expenses/add-expense',controllers.addexpense)

module.exports=router;