const express=require('express');
const expenseController=require('../controllers/expenseControllers')

const router=express.Router();


router.post('/',expenseController.adding)
router.get('/',expenseController.getting)
router.put('/:id',expenseController.updating)
router.delete('/:id',expenseController.deleting)



module.exports=router;