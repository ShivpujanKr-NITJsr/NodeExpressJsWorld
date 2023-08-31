const jwt=require('jsonwebtoken')

const Authorized=(req,res,next)=>{

    // try{


    // }catch(err){
    //     console.log(err);

    //     res.status(500).json({success:false})
    // }
    // console.log(req.headers);
    // console.log(req.headers.authorization)
    const token=req.headers.authorization
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        // console.log(decoded.foo) // bar
        if(err){
            res.status(500).json({success:false})
        }
        req.iduse=decoded
        next()

      });
}

module.exports=Authorized;