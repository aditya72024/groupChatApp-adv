const Users = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.signup = async (req,res,next) => {
    try{
        if(!req.body.data.username && !req.body.data.email && !req.body.data.phone && !req.body.data.password){
            throw {status: 401, message: "All Details are Mandatory!!!"}
        }

        const {username,email,phone,password} = req.body.data;

        bcrypt.hash(password, saltRounds, async (error, hash)=>{
            if(error){
                throw {status: 500, message: "Something went wrong!!!"}
            }

            try{
                await Users.create({username, email, phone, password: hash})
                res.status(201).json({success: true, message: "User created successfully!!!"})

            }catch(error){
                res.status(500).json({error: error})
            }
        })
    }catch(error){
        res.status(error.status | 500).json({status: error.status | 500, message: error.message})
    }
}

function generateAccessToken(id){
    return jwt.sign({userId: id}, 'qlJ6Jg(j&Lh');
}

exports.login = async (req, res, next) => {
    
    try{

        if(!req.body.data.email && !req.body.data.password ){
            throw {status: 403, message: 'All Details Mandatory!!!'};
        }

        const email = req.body.data.email;
        const password = req.body.data.password;

       
        const data = await Users.findAll({where : {email:email}});

        console.log(data);

        if(data.length == 0){
            throw {status: 404, message: 'User not found!!!'};
          
        }
        
        bcrypt.compare(password, data[0].password, function(err, result) {

            if(err){
                throw {status: 500, message: 'Something went wrong!!!'};
            
            }

            if(result === true){
                res.status(201).json({success:true,message:"User logged in !!!",token: generateAccessToken(data[0].id),ispremiumuser: data[0].ispremiumuser})
            }else{

                res.status(401).json({success:false,message:"User not authorised !!!"});
               
            }
            
        });
        

    }catch(err){
        res.status(err.status || 500).json({status: err.status, message: err.message})

    }
}
