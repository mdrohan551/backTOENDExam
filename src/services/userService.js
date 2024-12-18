const userModel = require('../models/userModels');
const bcrypt =require('bcrypt');
const {TokenEncode} = require("../utility/tokenHelper");

const registrationServices = async (req,res)=>{
  try{
      let {firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup}=req.body;
      if(!firstName ||!lastName || !NIDNumber || !phoneNumber || !password || !bloodGroup){
          return res.status(401).send({status: "fail", message: 'All fields are required'});
      }


      const ExistingUser = await userModel.findOne({phoneNumber:phoneNumber});
      if(ExistingUser){
          return res.json({status:"fail",message:"User already exists"});
      }


      const hasePassword = await bcrypt.hash(password,10);
       // create new user
       await userModel.create({
           firstName:firstName,
           lastName:lastName,
           NIDNumber:NIDNumber,
           phoneNumber:phoneNumber,
           password:hasePassword,
           bloodGroup:bloodGroup,

       })
      return{status:"success",message:"Successfully registered"};

  }catch (e){
      return{status:"fail",message:`Unable to register user${e}`};
  }

}
const loginServices  = async (req,res)=>{
    try{
      let {phoneNumber,password} = req.body;
      let data = await userModel.findOne({phoneNumber: phoneNumber})
        if(data === null){
            return{status:"fail",message:"User not found"};

        }
        const isPasswordValid = await bcrypt.compare(password, data.password);
        if(!isPasswordValid){
            return{status:"fail",message:"User does not match"};
        }else {
            // token encode
            let token = TokenEncode (data['phoneNumber'],data['_id'])
            return{status:"success",message:"Successfully login",Token:token};
        }

    }catch(err){
        return{status:"fail",message:`Unable to login user${err}`};
    }













}
const ProfileDetailsReadServices = async (req,res)=>{

try{
   let user_id = req.headers.user_id;
   let data = await userModel.findOne({_id:user_id})
    return{status:"success",data:data};


  }catch (e) {
    return{status:"fail",message:`user not found${err}`};
}



}
const AllUserprofileServices = async (req,res)=>{
   try{
      let projectionStage ={$project:{'phoneNumber':0,'password':0,'createdAt':0,'updatedAt':0,'NIDNumber':0}}
      let data = await userModel.aggregate([
          projectionStage
      ])





      return{status:"success",Alluser:data};
}catch (e) {
       return{status:"fail",message:`user not found${e}`};

   }
}
const ProfileUpdateServices = async (req,res)=>{

try{
    let reqBody = req.body;
    let user_id = req.headers['user_id'];
    await userModel.updateOne({_id:user_id},reqBody)
    return{status:"success",message:"Successfully updated user"};

}catch (err) {
    return{status:"fail",message:`user not found${err}`};
}



}
const deleteUserServices = async (req,res)=>{
    try{
        let {id} = req.params;
        let user_id = req.headers['user_id'];
        let result = await userModel.deleteOne({_id:id, _id:user_id});
        if(result.deletedCount > 0){
            return{status:"success",message:"Successfully updated user"};
        }else{
            return{status:"fail",message:"User not found or unauthorized"};
        }


    }catch (err) {
        return{status:"fail",message:`user not found${err}`};
    }
}



module.exports = {
    registrationServices,
    loginServices,
    ProfileDetailsReadServices,
    AllUserprofileServices,
    ProfileUpdateServices,
    deleteUserServices,
}