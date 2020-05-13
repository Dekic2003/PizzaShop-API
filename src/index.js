let express=require('express');
let app=express();
let mongoose=require('mongoose');

let pizaaRoute=require('../routes/pizza');

const pass='fJPJR8lTaQfWzd81';

mongoose.connect(`mongodb+srv://deniz:${pass}@pizzashop-cpxuq.mongodb.net/test?retryWrites=true&w=majority`);

app.use(pizaaRoute);
app.use(express.static('public'));

const PORT =3000;
app.listen(PORT,()=> console.info('Pocelo'));
