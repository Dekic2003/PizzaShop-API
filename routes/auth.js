const router=require('express').Router();
const User = require('../models/user.model');
const bcrypt  = require('bcryptjs')
const jwt=require('jsonwebtoken')
const {registerValidation,loginValidation}=require('../validation/userValidation');

router.post('/register', async (req,res)=>{

    if(!req.body)return res.status(400).send('Req body missing');
    const {error}=registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const emailExist = await User.findOne({email:req.body.email});

    if (emailExist) return res.send('Mail already in use');

    const salt = await bcrypt.genSalt(10);
    const hashedPass=await bcrypt.hash( req.body.password,salt);



    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPass
    })
    try {
        const savedUser = await user.save();
        res.send(savedUser._id);
    }catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req,res)=>{
    if(!req.body)return res.status(400).send('Req body missing');
    const {error}=loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Mail incorrect');
    const validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Password incorrect');

    const refreshToken=jwt.sign({_id:user._id},process.env.TOKEN_KEY,{expiresIn:'24h'})
    const accessToken=jwt.sign({name:user.name, _id:user._id},process.env.TOKEN_KEY,{expiresIn:'60s'})

    res.json({accessToken:accessToken,refreshToken:refreshToken,user:{ name: user.name}})

})



module.exports=router;
