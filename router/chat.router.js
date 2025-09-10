const router=require('express').Router();
const ChatController=require("../controller/chat.controller");
router.post('/newMessage',ChatController.message);
router.get('/getMessage',ChatController.getMessage);
module.exports=router;