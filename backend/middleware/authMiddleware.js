const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User=require('../model/userModel.js')

const protect = asyncHandler(async (req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)){

        
        try {
            token=req.headers.authorization.split(' ')[1]

            let decoded= jwt.verify(token,process.env.JWT_SECRET)
            
            req.user=await User.findById(decoded.id).select('-password')
            res.status(201)
            next()

        } catch (error) {

            console.log(error);
            res.status(401)
            throw new Error('Invalid Token')
            
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Token not Found')
    }
})

const emailVerified=async(req,res,next)=>{
    try {
        let email=req.body.email
        const user=await User.findOne({email})
        if(user.isEmailVerified){
            console.log('haiii');
            next()
            
        }
    } catch (error) {
        
        res.status(401)
        console.log('user  not veriiffied');
    }
}

module.exports={
    protect,
    emailVerified
}