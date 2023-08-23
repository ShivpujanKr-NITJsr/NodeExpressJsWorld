const express=require('express');
const addingController=require('../controllers/addingcontroller')

const router=express.Router();

router.post('/',addingController.adding)

router.delete('/:id',addingController.deleting)

router.put('/:id',addingController.updating)

router.get('/',addingController.getting)

module.exports=router;