let express=require('express');
let app=express();
let MongoClient = require('mongoose');
let bodyParser = require('body-parser');
let cors=require('cors');


let pizzaRoute=require('../routes/pizza');
let authRoute=require('../routes/auth');


MongoClient.connect('mongodb+srv://deniz:deniz@pizzashop-cpxuq.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true});


app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use(pizzaRoute);
app.use(authRoute);
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.info('Pocelo'));
