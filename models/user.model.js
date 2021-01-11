let MongoClient=require('mongoose')

const UserSchema=new MongoClient.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    Registered:{
        type:Date,
        default: Date.now
    }
})


