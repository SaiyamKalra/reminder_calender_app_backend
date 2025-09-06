const UserModel = require('../model/user.model'); 
const TokenModel=require('../model/token_model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
class UserService{
    static async registerUser(username,email,password){
        try{
            const createUser=new UserModel({username,email,password});
            return await createUser.save();
        }catch(err){
            throw err;
        }
    }
    static async checkUser(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            throw err;
        }
    }
    static async generateToken(tokenData,secretKey,jwt_expire){
        return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
    }
    static async getUserData(id){
        try{
            return UserModel.findById(id);
        }catch(e){
            throw e;
        }
    }

    static async changeUsername(email,newUsername){
        try{
            const filter={email:email};
            const update={$set:{username:newUsername}};
            const options={new:true};
            const usernameUpdate=await UserModel.findOneAndUpdate(filter,update,options);
            return usernameUpdate;
        }catch(e){
            throw e;
        }
    }
    static async updatePassword(email,newPassword){
        try{
            const salt = await bcrypt.genSalt(10);
        
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            const filter={email:email};
            const update={$set:{password:hashedPassword}};
            const option={new:true};
            const passwordUpdate=await UserModel.findOneAndUpdate(filter,update,option);
            return passwordUpdate;
        }catch(e){
            throw e;
        }
    }
    static async avatarUrlUpdate(email,avatarUrl){
        try{
            const filter={email:email};
            const update={$set:{avatarUrl:avatarUrl}};
            const option={new:true};
            const urlUpdate=await UserModel.findOneAndUpdate(filter,update,option);
            return urlUpdate;
        }catch(e){
            throw e;
        }
    }

    static async invalidateToken(token){
        try{
            const blacklistedToken=new TokenModel({token});
            return await blacklistedToken.save();
        }
        catch(e){
            throw e;
        }
    }
}

module.exports=UserService;