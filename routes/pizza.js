let express=require('express');
let router=express.Router();
let Pizzas=require('../models/pizzas.model');
const verifyToken =require('../validation/verifyToken')

router.post('/pizza',verifyToken,(req,res)=>{
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

router.get('/pizza',verifyToken,(req,res)=>{
   Pizzas.find()
       .then((doc,err)=>{
          if(doc){
             res.status(201).json(doc)
          }
          res.json(err);

       })
       .catch(err=>{res.json(err);})

});

router.put('/pizza/:id/like',verifyToken,(req,res)=>{

   Pizzas.findById(req.params.id)
       .then(doc=>{
           if(doc){
              Pizzas.findByIdAndUpdate(req.params.id,{'$push':{'rating.likes':req.params.id}},{new:true})
                  .then((doc, err) => {
                     if(doc){
                        res.status(201).json(doc.rating)
                     }
                     res.status(500).json(err);
                  }).catch(err =>{
                 res.status(500).send(err);
              })
           }}
       )

});

router.put('/pizza/:id/dislike',verifyToken,(req,res)=>{

   Pizzas.findById(req.params.id)
       .then(doc=>{
          if(doc){
             Pizzas.findByIdAndUpdate(req.params.id,{'$push':{'rating.dislikes':req.params.id}},{new:true})
                 .then((doc, err) => {
                    if(doc){
                       res.status(201).json(doc.rating)
                    }
                    res.status(500).json(err);
                 }).catch(err =>{
                res.status(500).send(err);
             })
          }}
       )

});

router.put('/pizza/likes/clean',verifyToken,(req,res)=>{

   Pizzas.findById(req.body._id)
       .then(doc=>{
          if(doc){
             Pizzas.findByIdAndUpdate(req.body._id,{'$set':{'rating.likes':[]}},{new:true})
                 .then((doc, err) => {
                    if(doc){
                       res.status(201).json(doc.rating)
                    }
                    res.status(500).json(err);
                 }).catch(err =>{
                res.status(500).send(err);
             })
          }}
       )

});

router.put('/pizza/dislikes/clean',verifyToken,(req,res)=>{

   Pizzas.findById(req.body._id)
       .then(doc=>{
          if(doc){
             Pizzas.findByIdAndUpdate(req.body._id,{'$set':{'rating.dislikes':[]}},{new:true})
                 .then((doc, err) => {
                    if(doc){
                       res.status(201).json(doc.rating)
                    }
                    res.status(500).json(err);
                 }).catch(err =>{
                res.status(500).send(err);
             })
          }}
       )

})

module.exports=router;
