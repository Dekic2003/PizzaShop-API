const jwt=require('jsonwebtoken');

function verifyToken(req,res,next){
    const token=req.header('Authorization');
    if(!token) return res.status(401).send('Unauthorized access') ;
    try {
        const verified=jwt.verify(token,process.env.TOKEN_KEY);
        next();
    }catch (err) {
        res.status(401).send({message: 'Invalid Token'});
    }


}

module.exports=verifyToken;
