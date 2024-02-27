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

        let chatsCount = await Chats.count({});
        if(+chatsCount > 10){
            chatsCount = +chatsCount - 10;
        }
        console.log(chatsCount);

        const data = await Chats.findAll({
            include: [{
              model: Users,
              attributes: ['username'],
            }],
            attributes: ['message'],
            offset: chatsCount,
            order: [['createdAt', 'ASC']],

            limit: 10,
          })



        res.status(201).json(data);

    }catch(err){
        console.log(err);
        res.status(err.status || 500).json({status: err.status || 500, message: "Something Went Wrong!!!"})
        
    }
}

exports.getLastChatId = async (req,res,next) => {

    
    try{
        

        const data = await Chats.findAll({
            attributes: ['id'],
            order: [['createdAt', 'DESC']],
            limit: 1,
          })

        res.status(201).json(data);

    }catch(err){
        console.log(err);
        res.status(err.status || 500).json({status: err.status || 500, message: "Something Went Wrong!!!"})
        
    }
}
