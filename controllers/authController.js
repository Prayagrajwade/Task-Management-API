import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

export const register = async(req,res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

    const {name,email,password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:"User already exists"})

        }

        user = new User({
            name,
            email,
            password
        });

        await user.save();

        const payload = {
            user:{
                id:user._id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:360000},(err,token)=>{
                if(err){
                    throw err;
                }
                res.json({token});
            }
        )
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
};


export const login = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }

    const {email,password} = req.body;

    try{
       let user = await User.findOne({email});
       if(!user){
        return res.status(400).json({msg:'Invalid Credentials'})
       }

       const isMatch = await bcrypt.compare(password,user.password);

       if(!isMatch){
        return res.status(400).json({mag:"Invalid Credentials"});
       }

       const payload = {
        user:{
            id:user._id
        }
       };

       jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:36000},(err,token)=>{
        if(err){
            throw err;
        }
        res.json({token});
       }

       );

    }catch(error){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export const getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }


};

export const getAllUser = async (req,res)=>{
    try {
    const user = await User.find({});
    res.send(user);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    
    }
    
}