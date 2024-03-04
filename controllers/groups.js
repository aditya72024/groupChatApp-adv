const Users = require('../models/users.js');
const userGroups = require('../models/usergroups.js');
const GroupAdmins = require('../models/groupadmins.js');
const Chats = require('../models/chats.js');
const Groups = require('../models/groups.js');
const groupInvitations = require('../models/groupinvitations.js');
const sequelize = require('../util/database');
const Sequelize = require('sequelize');


exports.createGroup = async (req,res,next) => {
    const t = await sequelize.transaction();
    try{

        
        if(!req.body.data.groupName){
            throw {status: 401, message: "Group Name is mandatory!!!"}
        }    
        const groupName = req.body.data.groupName; 

        console.log(groupName);

        const data = await req.user.createGroup({
            groupname : groupName,
        }, {transaction: t});


        await req.user.createGroupadmin({
            groupId: data.id
        }, {transaction: t})

        

        

        await t.commit();
    
        res.status(201).json(data);

    }catch(err){
        await t.rollback();
        res.status(500).json({status: res.status || 500,  message: res.message || "Something went wrong!!!", error:err});
      
    }
} 



exports.sendInvitation = async (req,res,next) => {
    const t = await sequelize.transaction();
    try{

        
        if(!req.body.data.invitee){
            throw {status: 401, message: "Invitee is mandatory!!!"}
        }    
        const invitee = req.body.data.invitee; 
        const inviteeGroup = req.body.data.inviteeGroup; 

        const userdata = await Users.findOne({where: {email: invitee}});
        if(!userdata){
            throw {status: 404, message: "User not found!!!"}
        }

   
        console.log(userdata.id,inviteeGroup);
        await groupInvitations.create({
            userId : userdata.id,
            groupId : inviteeGroup,
        }, {transaction: t});




        await userGroups.create({
            userId : userdata.id,
            groupId : inviteeGroup,
        }, {transaction: t});




        

        await t.commit();
    
        res.status(201).json({"success":"true"});

    }catch(err){
        await t.rollback();
        res.status(500).json({status: res.status || 500,  message: res.message || "Something went wrong!!!", error:err});
      
    }
} 


exports.getGroups = async (req,res,next) => {

    try{

        const data = await req.user.getGroups();
        res.status(201).json(data);

    }catch(err){
        
        res.status(500).json({status: res.status || 500,  message: res.message || "Something went wrong!!!", error:err});
      
    }

}


exports.getLastGroupId = async (req,res,next) => {
    console.log("----------------------",req.params.groupId)
    
    try{
        

        const data = await Groups.findAll({
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


exports.getUsers = async (req,res,next) => {

   
    try{

        const data = await Groups.findOne({
            where: {id: req.params.groupId},
            include: [{model: Users},{model: GroupAdmins}],
           

        });
        
        // console.log(data)
        res.status(201).json(data);

    }catch(err){
        console.log(err);
        res.status(err.status || 500).json({status: err.status || 500, message: "Something Went Wrong!!!"})
    }
}



exports.removeUser = async (req,res,next) => {

    console.log("hiiiiii");
    const t = await sequelize.transaction();

    try{


        

        await userGroups.destroy(
            {where: {groupId: req.body.data.groupId, userId: req.body.data.userId}},
            {transaction: t});

        await Chats.destroy(
                {where: {groupId: req.body.data.groupId, userId: req.body.data.userId}},
                {transaction: t});    

        await groupInvitations.destroy(
                    {where: {groupId: req.body.data.groupId, userId: req.body.data.userId}},
                    {transaction: t});            


                    const data = await Groups.findOne({
                        where: {id: req.body.data.groupId},
                        include: [{model: Users},{model: GroupAdmins}],
                       
            
                    });
                    
                    // console.log(data)
                      
    
        
         await t.commit();
    
    
         res.status(201).json(data);


    }catch(error){
        await t.rollback();
        res.status(500).json({status: res.status || 500,  message: res.message || "Something went wrong!!!", error:error});
    }
}


exports.makeAdmin = async (req,res,next) => {

  
    const t = await sequelize.transaction();

    try{



        const groupCreated = await GroupAdmins.create({
            userId: req.body.data.userId,
            groupId: req.body.data.groupId

        },{transaction: t})   
        
        
        await t.commit();

       

            const data = await Groups.findOne({
                where: {id: req.body.data.groupId},
                include: [{model: Users},{model: GroupAdmins}],
            

            });
            
      

                            
                    // console.log(data)
                      
    
        
        
    
    
         res.status(201).json(data);


    }catch(error){
        await t.rollback();
        res.status(500).json({status: res.status || 500,  message: res.message || "Something went wrong!!!", error:error});
    }
}


