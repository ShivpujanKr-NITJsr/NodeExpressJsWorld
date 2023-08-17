const express = require('express');

const shopController=require('../controllers/productsadd')

const router = express.Router();

router.get('/',shopController.shopping);

module.exports = router;
