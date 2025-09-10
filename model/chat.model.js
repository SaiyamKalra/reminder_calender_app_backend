const mongoose=require("mongoose");
const {Schema}=mongoose;

const chatSchema=new Schema({
    chatId:{
        type:String,
        required:true,
        index:true,
    },
    senderEmail:{
        type:String,
        required:true,
    },
    receiverEmail:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    isRead:{
        type:Boolean,
        default:false,
    },
    readAt:{
        type:Date,
        default:null,
    }
},{
    timestamps:true
});

module.exports=mongoose.model('chat',chatSchema);