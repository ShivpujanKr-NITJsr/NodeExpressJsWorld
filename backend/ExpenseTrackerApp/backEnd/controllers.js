const { Expense, User, Premium } = require('./models')

const sequelize=require('./databasecon')
require('dotenv').config();

const jwt = require('jsonwebtoken')
// const User=require('./models')

const Razorpay = require('razorpay')

const bcrypt = require('bcrypt')

exports.creating = (req, res, next) => {
    const uname = req.body.name;
    const uemail = req.body.email;
    const upassword = req.body.password;

    User.findAll({ where: { email: uemail } })
        .then(re => {

            if (re.length > 0) {
                // throw new Error('User with this email already exists');
                res.status(403).json({ Error: 'Error:Request failed with status code 403' })
            } else {
                bcrypt.hash(upassword, 10, (err, hash) => {
                    User.create({
                        name: uname,
                        email: uemail,
                        password: hash
                    }).then(result => res.json({ message: 'Successfully created new user' }))


                })

            }


        })
        .catch(err => console.log(err))

}

exports.logging = (req, res, next) => {
    const uemail = req.body.email;
    const upassword = req.body.password;

    User.findAll({ where: { email: uemail } })
        .then(re => {

            if (re.length > 0) {
                // throw new Error('User with this email already exists');
                // console.log(re)
                // res.status(403).json({Error:'Error:Request failed with status code 403'})

                bcrypt.compare(upassword, re[0].password, function (err, result) {
                    if (result == true) {
                        let token = jwt.sign(re[0].id, 'shhhhh');

                        res.json({ success: true, msg: 'User login successful', token: token ,ispremiumuser:re[0].ispremiumuser})
                    } else {
                        res.status(401).json({ success: false, msg: 'User not authorized' })
                    }
                });
                // if(re[0].password==upassword){
                //     res.json({msg:'User login sucessful'})
                // }else{
                //     res.status(401).json({msg:'User not authorized'})
                // }
            } else {
                res.status(404).json({ success: false, msg: 'User not found' })

            }


        })
        .catch(err => console.log(err))

}

exports.getexpenses = (req, res, next) => {
    Expense.findAll({ where: { UserId: req.iduse } })
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
}

exports.delexpenses = (req, res, next) => {
    Expense.findAll({ where: { id: req.params.id } })
        .then(result => {
            result[0].destroy();
            res.json(result);
        }).catch(err => console.log(err))
}

exports.addexpense = (req, res, next) => {
    const token = req.body.token;
    let id;
    jwt.verify(token, 'shhhhh', function (err, decoded) {
        // console.log(decoded.foo) // bar
        if (err) {
            res.status(500).json({ success: false })
        }
        id = decoded;
    });
    Expense.create({ price: req.body.price, description: req.body.description, category: req.body.category, UserId: id })
        .then(result => {
            res.json(result)
        }).catch(err => console.log(err))
}

exports.premiumBuy = async (req, res, next) => {
    try {
        const rzp = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret });
        const amount = 3900;

      
        const createOrder = () => {
            return new Promise((resolve, reject) => {
                rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(order);
                    }
                });
            });
        };

    
        const order = await createOrder();

        // Create a Premium record and handle errors
        await Premium.create({ orderid: order.id, status: 'PENDING', UserId: req.iduse });

        res.status(201).json({ order, key_id: rzp.key_id});
        
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Something went wrong', error: err.message });
    }
};



exports.updatingPremiumStatus = async(req, res, next) => {
    const id=req.iduse;
    const uorderid=req.body.order_id;
    const upaymentid=req.body.payment_id;
    if(!req.body.suc){
        
        try{
            console.log('payment passed')
            const p1=Premium.findAll({where:{orderid:uorderid}})
                .then(result=>{result[0].update({paymentid:upaymentid,status:'SUCCESSFUL'})})
            const p2=User.findAll({where:{id:req.iduse}}).then(re=>{re[0].update({ispremiumuser:true})})
            
            Promise.all([p1,p2]).then(()=>{
                return res.status(202).json({success:true,message:"Transactions successful"})
            }).catch(err=>{
                throw new Error(err)
            })
        }catch(error){
            return res.status(403).json({success:false,
                message:"transaction cancelled due to error"})
        }
    


    }else{

        try{
            console.log('payment failing in controllers')
            const p1=Premium.findAll({where:{orderid:uorderid}}).then(result=>{result[0].update({paymentid:upaymentid,status:'FAIL'})})

            const p2=User.findAll({where:{id:req.iduse}}).then(re=>{re[0].update({ispremiumuser:false})})

            Promise.all([p1,p2]).then(()=>{
                return res.status(202).json({success:true,message:"Transactions unsuccessful"})
            }).catch(err=>{
                throw new Error(err)
            })
        }catch(error){
            return res.status(403).json({success:false,message:err.message})
        }
        
    }
    

}

exports.leaderboardShow= async(req,resp,next)=>{
    // let Users=[];
    // User.findAll()
    //     .then(res=>{
    //         for(let i=0;i<res.length;i++){
    //             let sum=0;
    //             Expense.findAll({where:{UserId:res[i].id}})
    //             .then(result=>{
    //                 for(let j=0;j<result.length;j++){
    //                     sum+=result[j].price;
    //                 }
    //                 console.log(`${res[i].name}= ${sum}`)

    //                 // let obj={
    //                 //     name:res[i].name,
    //                 //     expense:sum
    //                 // }
    //                 // Users.push(obj)
    //             })
                
    //             let obj={
    //                 name:res[i].name,
    //                 expense:sum
    //             }
    //             Users.push(obj)
    //         }
    //         resp.status(200).json(Users);
    //     }).catch(err=>console.log(err))

    // try{
    //     // const users=await User.findAll()
    //     // const expenses=await users.map(user=>{
    //     //     Expense.findAll({where:{UserId:user.id}})
    //     // })

        
    // }catch(err){

    // }

    // User.findAll()         //working
    //     .then(res=>{
    //         let promises=res.map(user=>{
    //             return Expense.findAll({where:{UserId:user.id}})
    //                 .then(exp=>{
    //                     const sum = exp.reduce((sumtotal, expense) => sumtotal + expense.price, 0);
    //                     return {
    //                         name:user.name,
    //                         expense:sum
    //                     }
    //                 })
    //         })
    //         return Promise.all(promises)
    //     }).then(results=>{
    //         resp.status(200).json(results);
    //     })
    //     .catch(err => console.log(err));
    try{
        const userss=await User.findAll({
            attributes :['id','name',[sequelize.fn('sum', sequelize.col('expenses.price')),'expense']],
            include :[
                {
                    model: Expense,
                    attributes:[]
                }
            ],
            group:['user.id'],
            order:[['expense','DESC']]
        })
        console.log(userss)
        resp.status(200).json(userss)
        
    }catch(err){
        console.log(err);
        resp.status(500).json(err)
    }
    

}

