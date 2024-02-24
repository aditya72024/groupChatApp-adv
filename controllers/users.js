const Users = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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