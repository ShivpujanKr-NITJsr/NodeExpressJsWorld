const express=require('express');
const contactingController=require('../controllers/productsadd')


const router=express.Router();

router.get('/contactus',contactingController.contactingUs)

router.get('/success',contactingController.onsuccess)

module.exports = router;