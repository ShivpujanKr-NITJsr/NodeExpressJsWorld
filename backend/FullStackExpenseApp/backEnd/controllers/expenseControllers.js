const Expense=require('../models/expense')


exports.adding=(req,res,next)=>{
    // console.log(req)
    const price=req.body.price;
    const description=req.body.description;
    const category=req.body.category;

    Expense.create(
        {
            price:price,
            description:description,
            category:category

        }
    ).then(result=>{
        console.log('expense created')
        res.json(result);
    }).catch(err=>console.log(err))
}

exports.updating=(req,res,next)=>{
    const id=req.params.id;
    const uprice=req.body.price;
    const udescription=req.body.description;
    const ucategory=req.body.category;

    Expense.findByPk(id)
        .then(result=>{
            result.price=uprice;
            result.description=udescription;
            result.category=ucategory;
            return result.save();
        })
        .then(result=>{
            console.log('expense updated')
            res.json(result);
        })
        .catch(err=>console.log(err))
}

exports.getting=(req,res,next)=>{
    Expense.findAll()
    .then(exp=> {
        res.json(exp)
      }).catch(err=>console.log(err))
}

exports.deleting=(req,res,next)=>{
    const id=req.params.id;
    Expense.findByPk(id)
    .then(exp=> {
        return exp.destroy();
        
      })
      .then(result=>{
        res.json(result)
      })
      
      .catch(err=>console.log(err))
}


