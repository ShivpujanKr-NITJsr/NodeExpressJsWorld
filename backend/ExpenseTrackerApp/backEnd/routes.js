const express=require('express');
const controllers=require('./controllers')
const router=express.Router();
const Authorization=require('./auth')

router.post('/user/signup',controllers.creating)

router.post('/user/login',controllers.logging)

router.get('/expenses/getexpense',Authorization,controllers.getexpenses)

router.delete('/expenses/deleteexpense/:id',controllers.delexpenses)

router.post('/expenses/add-expense',controllers.addexpense)

router.get('/premiumroute/buypremium',Authorization,controllers.premiumBuy)

router.post('/premiumroute/updatetransactionstatus',Authorization,controllers.updatingPremiumStatus)

module.exports=router;