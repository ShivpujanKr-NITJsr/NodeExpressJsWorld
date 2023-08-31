const User=require('./models')

const bcrypt=require('bcrypt')

exports.creating=(req,res,next)=>{
    const uname=req.body.name;
    const uemail=req.body.email;
    const upassword=req.body.password;

    User.findAll({where:{email:uemail}})
        .then(re=>{

            if(re.length>0){
                // throw new Error('User with this email already exists');
                res.status(403).json({Error:'Error:Request failed with status code 403'})
            }else{
                bcrypt.hash(upassword, 10, (err,hash)=>{
                    User.create({
                        name:uname,
                        email:uemail,
                        password:hash
                    }).then(result=>res.json({message:'Successfully created new user'}))
                    
    
                })
                
            }
            
        
        })
        .catch(err=>console.log(err))

}

exports.logging=(req,res,next)=>{
    const uemail=req.body.email;
    const upassword=req.body.password;

    User.findAll({where:{email:uemail}})
        .then(re=>{

            if(re.length>0){
                // throw new Error('User with this email already exists');
                // console.log(re)
                // res.status(403).json({Error:'Error:Request failed with status code 403'})

                bcrypt.compare(upassword, re[0].password, function(err, result) {
                    if(result==true){
                        res.json({msg:'User login sucessful'})
                    }else{
                        res.status(401).json({msg:'User not authorized'})
                    }
                });
                // if(re[0].password==upassword){
                //     res.json({msg:'User login sucessful'})
                // }else{
                //     res.status(401).json({msg:'User not authorized'})
                // }
            }else{
                res.status(404).json({msg:'User not found'})
                

            }
            
        
        })
        .catch(err=>console.log(err))

}