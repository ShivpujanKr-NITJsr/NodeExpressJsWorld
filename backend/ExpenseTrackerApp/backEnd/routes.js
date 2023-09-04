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

router.get('/premiumroute/leaderboardshow',controllers.leaderboardShow)

router.get('/password/forgotpassword/:email',controllers.forgotPasswd)

router.get('/password/resetpassword/:uuidd',controllers.resetPassword)

router.post('/password/resetpasswd',controllers.changingPasswd)

router.get('/download',Authorization,controllers.downloading)

router.get('/download/allurl',Authorization,controllers.allUrl)

module.exports=router;