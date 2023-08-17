const express=require('express');
const path=require('path')
const rootDir=require('../util/path')


const router=express.Router();

router.get('/contactus',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','getCall.html'))
    

})

router.get('/success',(req,res,next)=>{
    res.send('Form submitted successfully');
})

module.exports = router;