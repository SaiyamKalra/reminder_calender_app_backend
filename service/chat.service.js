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
    static async markAsRead(chatId,messageIds){
        try{
            if (!Array.isArray(messageIds)) {
                throw new Error("messageIds must be an array.");
            }
            const updateResult=await ChatModel.updateMany({chatId:chatId,_id:{$in:messageIds},isRead:false},{$set:{isRead:true,readAt:new Date(),},})
            return updateResult;
        }catch(e){
            throw e;
        }
    }
    static async deleteMessage(messageId){
        try{
            const deleteUser=await ChatModel.deleteOne({_id:messageId});
            return deleteUser;
        }catch(e){
            throw e;
        }
    }
}

module.exports=ChatService;