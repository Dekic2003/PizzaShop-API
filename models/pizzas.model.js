let mongoose=require('mongoose');

let PizzasSchema=mongoose.Schema({

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

module.exports=mongoose.model('Pizzas',PizzasSchema);
