const Order = require('../models/Orders')

module.exports = {
    getOrders: async (req,res)=>{
        console.log(req.user)
        try{
            const orderItems = await Order.find({userId:req.user.id})
            const itemsLeft = await Order.countDocuments({userId:req.user.id,completed: false})
            const custName = await Order.find({name: req.body.name})
            res.render('orders.ejs', {order: orderItems, left: itemsLeft, user: req.user, name: custName})
        }catch(err){
            console.log(err)
        }
    },
    createOrder: async (req, res)=>{
        try{
            await Order.create({order: req.body.orderItem, completed: false, userId: req.user.id, name: req.body.name})
            console.log('Order has been added!')
            console.log(req.body.name)
            res.redirect('/orders')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Order.findOneAndUpdate({_id:req.body.orderIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Order.findOneAndUpdate({_id:req.body.orderIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteOrder: async (req, res)=>{
        console.log(req.body.orderIdFromJSFile)
        try{
            await Order.findOneAndDelete({_id:req.body.orderIdFromJSFile})
            console.log('Deleted Order')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    