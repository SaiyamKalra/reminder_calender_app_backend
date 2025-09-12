const {response}=require("express");
const ChatService=require("../service/chat.service");

exports.message=async(req,res,next)=>{
    try{
        const {senderEmail,receiverEmail,message}=req.body;
        if(!senderEmail || !receiverEmail || !message){
            return res.status(400).json({
                status:false,
                error:"data not found completely",
            });
        }
        const sortedEmails=[senderEmail,receiverEmail].sort();
        const chatId=sortedEmails.join('_');
        const successRes=await ChatService.message(senderEmail,receiverEmail,chatId,message);
        return res.status(200).json({
            status:true,
            message:"message sent successfully",
            data:successRes,
        })
    }catch(e){
        next(e);
    }
}

exports.getMessage=async(req,res,next)=>{
    try{
        const {senderEmail,receiverEmail}=req.query;
        if(!senderEmail || !receiverEmail){
            return res.status(400).json({
                status:false,
                error:"Data not received",
            });
        }
        const sortedEmail=[senderEmail,receiverEmail].sort();
        const chatId=sortedEmail.join('_');
        const successRes=await ChatService.displayMessage(chatId);
        return res.status(200).json({
            status:true,
            message:"Data retrieved successfully",
            messages:successRes
        });
    }catch(e){
        next(e);
    }
}

exports.markAsRead=async(req,res,next)=>{
    try{
        const{senderEmail,receiverEmail,messageIds}=req.body;
        if (!senderEmail || !receiverEmail || !messageIds || !Array.isArray(messageIds)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid request body. `messageIds` must be an array.',
            });
        }
        const sortedEmails=[senderEmail,receiverEmail].sort();
        const chatId=sortedEmails.join('_');
        const result=await ChatService.markAsRead(chatId,messageIds);
        return res.status(200).json({
            status:true,
            message:'Message marked as read',
            data:result,
        })
    }catch(e){
        next(e);
    }
}

exports.deleteMessage=async(req,res,next)=>{
    try{
        const{messageId}=req.params;
        const successRes=await ChatService.deleteMessage(messageId);
        if(!successRes){
            return res.status(400).json({
                status:false,
                message:'Message not found',
            })
        }
        return res.status(200).json({
            status:true,
            message:'Message deleted successfully',
        })
    }catch(e){
        next(e);
    }
}