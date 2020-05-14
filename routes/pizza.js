let express=require('express');
let router=express.Router();
let Pizzas=require('../models/pizzas.model');

router.post('/pizza',(req,res)=>{
   if(!req.body){
      return res.status(400).send('Req body missing');
   }
   let model= new Pizzas(req.body);
   model.save()
   .then(doc=>{
      if(!doc || doc.length === 0 ){
         return res.status(500).send(doc);
      }
      res.status(201).send(doc);

   })
       .catch(err=>{
          res.status(500).json(err);
       })
});

router.get('/pizza',(req,res)=>{

   Pizzas.find()
       .then((doc,err)=>{
          if(doc){
             res.status(201).json(doc)
          }
          res.json(err);

       })
       .catch(err=>{res.json(err);})

});


module.exports=router;
