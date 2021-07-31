const express=require('express')
const router=express.Router();
const verifyToken=require('../validation/verifyToken')
const jwt=require('jsonwebtoken')
const User=require('../models/user.model')

router.post('/refreshToken',async (req,res)=>{

    const refreshToken=req.body.refreshToken;
    if(!refreshToken) return res.status(401).send('Refresh Token Missing');
    try {
        const user=jwt.verify(refreshToken,process.env.TOKEN_KEY)
        const payload = await User.findOne({_id:user._id})
        const newAccessToken=jwt.sign({name:payload.name, _id:payload._id},process.env.TOKEN_KEY,{expiresIn:'30s'})
        res.status(201).send({accessToken:newAccessToken});
    }catch (err){
        res.status(401).send({err:err.name})
    }


})

module.exports=router;
