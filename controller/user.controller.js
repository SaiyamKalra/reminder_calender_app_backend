const UserService=require('../service/user.service');

exports.register=async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        const successRes=await UserService.registerUser(username,email,password);
        // res.json({status:true,success:"User Registered Successfully"});
        res.status(201).json({
      status: true,
      message: "User registered successfully",
      user: { id: successRes._id, email: successRes.email }
    });
    }catch(error){
        next(error);
    }               
}
