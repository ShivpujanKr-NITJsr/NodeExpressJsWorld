const User=require('./models')

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
                User.create({
                    name:uname,
                    email:uemail,
                    password:upassword
                }).then(result=>res.json({message:'User created now click on existing login and please login through that'}))
                

            }
            
        
        })
        .catch(err=>console.log(err))

}