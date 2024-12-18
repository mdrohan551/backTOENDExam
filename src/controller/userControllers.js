







// RegisterUser
const {registrationServices,
    loginServices,
    ProfileDetailsReadServices,
    AllUserprofileServices,
    ProfileUpdateServices,
    deleteUserServices} = require("../services/userService");
exports.register = async (req, res) => {
 let result = await registrationServices(req)
    return res.status(200).json(result)
};



// login
exports.login = async (req, res) => {
    let result = await loginServices(req)
    return res.status(200).json(result)


}


// user profile


exports.ProfileDetails = async (req, res) => {
    let result = await ProfileDetailsReadServices(req)
    return res.status(200).json(result)

}



// all users

exports.getAllUsers  = async (req, res) => {
    let result = await AllUserprofileServices(req)
    return res.status(200).json(result)
}



// update user Profile
exports.updateUserProfile   = async (req, res) => {
   let result = await ProfileUpdateServices(req)
    return res.status(200).json(result)
}


exports.DeleteUser  = async (req, res) => {
    let result = await deleteUserServices(req)
    return res.status(200).json(result)
}


