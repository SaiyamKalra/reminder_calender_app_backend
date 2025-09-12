const router=require('express').Router();
const ChatController=require("../controller/chat.controller");
router.post('/newMessage',ChatController.message);
router.get('/getMessage',ChatController.getMessage);
router.patch('/markAsRead',ChatController.markAsRead);
router.delete('/deleteMessage/:messageId',ChatController.deleteMessage);
module.exports=router;