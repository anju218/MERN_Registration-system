const dotenv=require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//Middleware
const middleware=(req,res,next)=>{
    console.log("Middleware");
    next();
}

dotenv.config({path: './config.env'});
require('./db/conn');

app.use(express.json());
app.use(require('./router/auth'))
const PORT = process.env.PORT || 5000;




//middleware()

// app.get('/',(req,res)=>{
//     res.send(`Hello World`);
// })
// app.get('/details',middleware,(req,res)=>{
//     res.send(`AboutMe`);
// })
// app.get('/signup',(req,res)=>{
//     res.send(`Register urself`);
// })
// app.get('/login',(req,res)=>{
//     res.send(`login urself`);
// })
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`);
})


