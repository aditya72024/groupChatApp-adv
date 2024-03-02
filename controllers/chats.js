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
        const groupId = req.body.data.groupId; 

        const data = await req.user.createChat({
            message : message,
            groupId : groupId,
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

        let chatsCount = await Chats.count({where:{groupId:req.params.groupId}});
        let offsetCount;
        if(+chatsCount > 10){
             offsetCount = +chatsCount - 10;
        }else{
            offsetCount = 0;
        }
        console.log("----------------------------",chatsCount);

        const data = await Chats.findAll({
            where: {groupId:req.params.groupId},
            include: [{
              model: Users,
              attributes: ['username'],
            }],
            attributes: ['message'],
            offset: offsetCount,
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
    console.log("----------------------",req.params.groupId)
    
    try{
        

        const data = await Chats.findAll({
            where: {groupId: req.params.groupId},
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
