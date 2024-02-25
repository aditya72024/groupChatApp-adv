const Chats = require('../models/chats');
const sequelize = require('../util/database');

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
        res.status(500).json({status: res.status | 500,  message: "Something went wrong!!!"});
      
    }
}
