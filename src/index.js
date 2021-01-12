let express=require('express');
let app=express();
let MongoClient = require('mongoose');
let bodyParser = require('body-parser');
let dotenv=require('dotenv')
let cors=require('cors');

dotenv.config();


let pizzaRoute=require('../routes/pizza');
let authRoute=require('../routes/auth');


MongoClient.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology: true},()=>{
    console.log('DB Connected');
});


app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use(pizzaRoute);
app.use(authRoute);
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.info('Pocelo'));
