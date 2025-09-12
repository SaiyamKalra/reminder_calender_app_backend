const { response } = require('express');
const UserService=require('../service/user.service');

exports.register=async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        const successRes=await UserService.registerUser(username,email,password);
        // res.json({status:true,success:"User Registered Successfully"});
        res.status(201).json({
      status: true,
      message: "User registered successfully",
      user: { id: successRes._id,username:successRes.username, email: successRes.email,avatarUrl:successRes.avatarUrl }
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

            res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl || null,
      },
    });
        }
    }catch(e){
        throw e;
    }
}

exports.getUserData=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const successRes=await UserService.getUserData(id);
        if (!successRes) {
            return res.status(404).json({
                status: false,
                message: 'User not found',
            });
        }
        res.status(200).json({
            status:true,
            message:'User data fetched successfully',
            user:{id:successRes._id,username:successRes.username,email:successRes.email,avatarUrl:successRes.avatarUrl||null},
        })
    }catch(e){
        next(e);
    }
}

exports.updateUsername=async(req,res,next)=>{
    try{
        const {email}=req.params;
        const {newUsername}=req.body;
        if(!newUsername || !email){
            return res.status(400).json({
                error:'New username or email is required.'
            });
        }
        const successUpdate=await UserService.changeUsername(email,newUsername);
        if(!successUpdate){
            return res.status(404).json({
                error:'User not found',
            })
        }
        return res.status(200).json({
            status:true,
            message:'data updated successfully',
            user:{id:successUpdate._id,email:successUpdate.email,username:successUpdate.username},
        })
    }catch(e){
        next(e);
    }
}

exports.updatePassword=async(req,res,next)=>{
    try{
        const {email}=req.params;
        const {newPassword}=req.body;
        if(!email || !newPassword){
            return res.status(400).json({
                error:'data not found of email or password',
            });
        }
        const successUpdate=await UserService.updatePassword(email,newPassword);
        if(!successUpdate){
            return res.status(400).json({
                error:'user not found',
            });
        }
        return res.status(200).json({
            status:true,
            message:'Updated Successfully',
            user:{
                id:successUpdate._id,
                email:successUpdate.email,
                username:successUpdate.username,
                // password:successUpdate.password,
            }
        });
    }
    catch(e){
        next(e);
    }
}

exports.avatarUrlUpdate=async(req,res,next)=>{
    try{
        const {email}=req.params;
        // const {avatarUrl}=req.body;
        if(!email || !req.file){
            return res.status(400).json({
                status:false,
                error:'email or avatarUrl not found',
            });
        }
        const avatarUrl=req.file.path;
        const successRes=await UserService.avatarUrlUpdate(email,avatarUrl);
        if(!successRes){
            return res.status(400).json({
                status:false,
                error:'User not found',
            })
        }
        return res.status(200).json({
            status:true,
            response:'Avatar Url updated successfully',
            user:{
                id:successRes._id,
                avatarUrl:successRes.avatarUrl,
            }
        })
    }catch(e){
        next(e);
    }
}

exports.getAllUsername=async(req,res,next)=>{
    const {email}=req.params;
    try{
        const successRes=await UserService.getAllUsername(email);
        if(!successRes){
            return res.status(400).json({
                error:"Username does not exist"
            });
        }
        return res.status(200).json({
            status:true,
            response:"Username fetched successfully",
            data:successRes,
        })
    }catch(e){
        next(e);
    }
}

exports.logout=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1];
        await UserService.invalidateToken[token];
        return res.status(200).json({
            status:true,
            message:'Logged out successfully',
        })
    }
    catch(e){
        next(e);
    }
};
