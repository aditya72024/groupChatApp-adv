const Chats = require('../models/chats');
const Users = require('../models/users');
const sequelize = require('../util/database');
const Sequelize = require('sequelize');

exports.postMessage = async (req,res,next) => {
 
    const t = await sequelize.transaction();
    try{

        
        if(!req.body.data.message){
            throw {status: 401, message: "Message is mandatory!!!"}
        }    
        const message = req.body.data.message; 

        const data = await req.user.createChat({
            message : message,
        }, {transaction: t});

        await t.commit();
    
        res.status(201).json(data);

    }catch(err){
        await t.rollback();
        res.status(500).json({status: res.status || 500,  message: res.message || "Something went wrong!!!"});
      
    }
}

exports.getChats = async (req,res,next) => {

    
    try{
        

        const data = await Chats.findAll({
            include: [{
              model: Users,
              attributes: ['username'],
            }],
            attributes: ['message'],
            order: [['createdAt', 'ASC']],
          })

        
        console.log(req.user.id);
        console.log(data);


        res.status(201).json(data);

    }catch(err){
        console.log(err);
        res.status(err.status || 500).json({status: err.status || 500, message: "Something Went Wrong!!!"})
        
    }
}
