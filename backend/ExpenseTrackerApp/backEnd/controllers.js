const { Expense, User, Premium } = require('./models')

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

                        res.json({ success: true, msg: 'User login successful', token: token })
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

        // Create the order asynchronously using Promises
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

        // Create the order and handle errors
        const order = await createOrder();

        // Create a Premium record and handle errors
        await Premium.create({ orderid: order.id, status: 'PENDING', UserId: req.iduse });

        res.status(201).json({ order, key_id: rzp.key_id });
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Something went wrong', error: err.message });
    }
};



exports.updatingPremiumStatus = (req, res, next) => {
    const id=req.iduse;
    const uorderid=req.body.order_id;
    const upaymentid=req.body.payment_id;
    if(!req.body.suc){
        
    console.log('payment passed')
    Premium.findAll({where:{orderid:uorderid}})
        .then(result=>{
            result[0].update({paymentid:upaymentid,status:'SUCCESSFUL'})
                .then(()=>{
                    User.findAll({where:{id:req.iduse}}).then(re=>{
                        re[0].update({ispremiumuser:true}).then(()=>{
                            return res.status(202).json({success:true,message:"Transactions successful"})
                        }).catch(err=>{
                            throw new Error(err)
                        })
                    })
                }).catch(err=>{
                    throw new Error(err)
                })
        }).catch(err=>{

            return res.status(403).json({success:false,
                message:"transaction cancelled due to error"})
        })

    }else{
        console.log('payment failing in controllers')
        Premium.findAll({where:{orderid:uorderid}})
        .then(result=>{
            result[0].update({paymentid:upaymentid,status:'FAIL'})
                .then(()=>{
                    User.findAll({where:{id:req.iduse}}).then(re=>{
                        re[0].update({ispremiumuser:false}).then(()=>{
                            return res.status(202).json({success:true,message:"Transactions unsuccessful"})
                        }).catch(err=>{
                            throw new Error(err)
                        })
                    })
                }).catch(err=>{
                    throw new Error(err)
                })
        }).catch(err=>{


            return res.status(403).json({success:false,message:err.message})
        })
    }
    

}