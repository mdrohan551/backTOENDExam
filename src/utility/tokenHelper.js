const jwt = require("jsonwebtoken");
const {JWT_EXPIRE_TIME, JWT_KEY} =require('../config/config');





 const TokenEncode = (email,user_id)=>{
    const Key = JWT_KEY;
    const EXPIRE = {expiresIn: JWT_EXPIRE_TIME}
    const PAYLOAD = {email:email,user_id:user_id}
    return jwt.sign(PAYLOAD,Key,EXPIRE)
}

 const TokenDecode = (token)=>{
    try{
        return jwt.verify(token,JWT_KEY)
    }catch (e) {
        return null
    }
}
module.exports = {TokenDecode,TokenEncode}