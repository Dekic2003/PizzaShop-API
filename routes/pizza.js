let express=require('express');
let router=express.Router();
router.get('/pizza', (req, res)=>{
   res.send('Pizaaaaa');
});

module.exports=router;
