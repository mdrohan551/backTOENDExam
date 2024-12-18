const { TokenDecode } = require("../utility/tokenHelper");



module.exports= (req,res,next)=>{
    let token= req.headers['token']
    if(!token){
        token=req.cookies['token']
    }
    let decoded = TokenDecode(token)

    if(decoded=== null){
        res.status(401).send({status:"fail",message:"unauthorized"})
    }else {
        let email = decoded.email;
        let user_id = decoded.user_id;
        req.headers.email=email;
        req.headers.user_id=user_id;
        next()
    }
}