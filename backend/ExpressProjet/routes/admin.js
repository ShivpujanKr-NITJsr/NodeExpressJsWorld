

const express = require('express');

const productsController=require('../controllers/productsadd')


const router = express.Router();

router.get('/add-product',productsController.addingAllProducts );

router.post('/add-product',productsController.addedAllProducts );

module.exports = router;
