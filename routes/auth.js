const router=require('express').Router();
const User = require('../models/user.model');
const {registerValidation}=require('../validation/userValidation')

router.post('/register', async (req,res)=>{
    console.log(registerValidation(req.body));
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    res.send('beeee')
    try {
        /*const savedUser = await user.save();
        res.send(savedUser);*/
    }catch (err) {
        res.status(400).send(err)
    }
})


module.exports=router;
