const User=require('../models/users')

exports.adding=(req,res,next)=>{

    // console.log(`creating called `,req)

    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;
    
    // console.error(req.body,'i m body')
    User.create({
        username:username,
        phone:phone,
        email:email,
        
    })
    .then(result=>{
    console.log(result)
    res.json(result)
    })
    .catch(err=>{
    console.log(err)
    })
}

exports.deleting=(req,res,next)=>{
    // console.log(`deleting called `,req)
    User.findByPk(req.params.id)
        .then(user=>{
           return  user.destroy();
        }).then(result=>{
            console.log('Destroyed user')
            res.json(result);
          })
          .catch(err=>console.log(err))
}

exports.updating=(req,res,next)=>{
    // console.log(`updating called `,req)
    const id=req.params.id;
    const uname=req.body.username;
    const uemail=req.body.email;
    const uphone=req.body.phone;

    User.findByPk(id)
        .then(users=>{
            users.username=uname;
            users.email=uemail;
            users.phone=uphone;
            return users.save()
        }).then(result=>{
            console.log('updated user')
            res.json(result);
          })
          .catch(err=>console.log(err))
}

exports.getting=(req,res,next)=>{
    User.findAll()
    .then(users => {
        res.json(users)
      }).catch(err=>console.log(err))
}

