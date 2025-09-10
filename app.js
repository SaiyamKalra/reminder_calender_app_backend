// importing the module
const express =require('express')
const body_parser=require('body-parser');
const userRouter=require('./router/user.router');
const chatRouter=require('./router/chat.router');
// const TodoRouter=require('./routes/todo.router');
const app=express();
app.use(body_parser.json());
app.use('/',userRouter);
app.use('/',chatRouter);
// app.use('/',TodoRouter);
// In your main app.js or server.js file
app.use((err, req, res, next) => {
  if (err.statusCode === 415) {
    return res.status(415).json({
      status: false,
      error: err.message,
    });
  }
  // Handle other types of errors
  res.status(500).json({
    status: false,
    error: 'An internal server error occurred.',
  });
});
module.exports=app;