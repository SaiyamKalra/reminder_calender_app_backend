const ChatModel=require("../model/chat.model");

class ChatService{
    static async message(senderEmail,receiverEmail,chatId,message){
        try{
            const newMessage=await ChatModel.create({senderEmail,receiverEmail,chatId,message});
            return newMessage;
        }catch(e){
            throw e;
        }
    }
    static async displayMessage(chatId){
        try{
            const displayMessage=await ChatModel.find({chatId:chatId});
            return displayMessage;
        }catch(e){
            throw e;
        }
    }
    static async markAsRead(chatId,messageId){
        try{
            const updateResult=await ChatModel.updateMany({chatId:chatId,_id:{$in:messageId},isRead:false},{$set:{isRead:true,readAt:new Date(),},})
            return updateResult;
        }catch(e){
            throw e;
        }
    }
}

module.exports=ChatService;