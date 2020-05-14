let MongoClient = require('mongoose');

let PizzasSchema=MongoClient.Schema({

    name:{
      type: String,
      required: true
    },
    ingredients :{
        type:String,
        required:true
    },
    rating:{
      dislikes:[],
      likes:[]
    },
    price:{
        type: Number,
        required:true
    }


});

module.exports=MongoClient.model('Pizzas',PizzasSchema);
