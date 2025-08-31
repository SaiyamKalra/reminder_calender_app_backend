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

exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await UserService.checkUser(email);
        if(!user){
            throw new Error('user does not exist');
        }
        else{
            const isMatch=await user.comparePassword(password);
            if(isMatch==false){
                throw new Error("err");
            }
            let tokenData={_id:user._id,email:user.email};
            const token=await UserService.generateToken(tokenData,'secretKey','1h')

            res.status(200).json({status:true,token:token})
        }
    }catch(e){
        throw e;
    }
}