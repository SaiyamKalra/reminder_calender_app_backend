// importing the module
const express =require('express')
const body_parser=require('body-parser');
const userRouter=require('./router/user.router');
// const TodoRouter=require('./routes/todo.router');
const app=express();
app.use(body_parser.json());
app.use('/',userRouter);
// app.use('/',TodoRouter);
module.exports=app;