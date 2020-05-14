let express=require('express');
let app=express();
let MongoClient = require('mongoose');
let bodyParser = require('body-parser');


let pizzaRoute=require('../routes/pizza');


MongoClient.connect('mongodb+srv://deniz:deniz@pizzashop-cpxuq.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true});

app.use(bodyParser.json());

app.use(pizzaRoute);
app.use(express.static('public'));

const PORT =3000;
app.listen(PORT,()=> console.info('Pocelo'));
