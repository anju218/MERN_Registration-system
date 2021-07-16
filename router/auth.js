const dotenv=require('dotenv');
const  jwt = require('jsonwebtoken');
const express = require("express");
const bcrypt= require('bcryptjs');
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
dotenv.config({path: './config.env'});
router.get("/", (req, res) => {
  res.send(`Hello World from router`);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "fill properly" });
}
  try {
    const userPhone = await User.findOne({ phone: phone });
    const userExist = await User.findOne({ email: email });
    if (userExist || userPhone) {
      return res.status(402).json({ error: "User already exists" });
    }else if(password!=cpassword){
      return res.status(401).json({ error: "Password Doesn't match" });
    }else{
      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let code = getRndInteger(1000,5000);
      const user = new User({ name, email, phone, password, cpassword,code });
      
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require('twilio')(accountSid, authToken);
    
    client.messages
      .create({
         body: `Enter the OTP ${code} for verification `,
         from: '+17038795798',
         to: `+91${phone}`
       })
      .then
        await user.save();
        res.status(201).json({ message: "Check your mobile for OTP" });
  }
}catch(err){
    console.log(err);
  }
})

router.post("/verify",async(req,res)=>{
  const{email,code}=req.body;
  const userVerify =await User.findOne({ email: email });
  if(userVerify)
  {
    if(userVerify.code===code)
    {
      
      res.status(201).json({ message: "User is Verified" });
    }
    else
    {
      return res.status(401).json({ error:"Wrong OTP" });
    }

  }
  else
  {
    return res.status(401).json({ error:"Error" });
  }
})
 
  

router.post("/signin", async(req, res) => {
  // console.log(req.body);
  // res.json({message:"logged in"});
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Pleae fill data" });
    }
    const userLogin =await User.findOne({ email: email });

    if(userLogin){
      const isMatch = await bcrypt.compare(password,userLogin.password);
      token = await userLogin.generateAuthToken();
      //console.log(token);
      res.cookie("jwtoken",token,{
        expires: new Date(Date.now() + 25892000000),
        httpOnly:true
      });

      if(!isMatch)
        return res.status(400).json({ message: "Invalid Credentials" });
      else
        return res.status(201).json({ message: "user logged in successfully" });
    }else{
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/details", async(req,res)=>{
    const { email,dateofbirth, education, address1, address2, pincode,city,state,country } = req.body;
    if (!dateofbirth || !education || !address1 || !address2 || !pincode || !city || !state || !country) {
      return res.status(422).json({ error: "fill properly" });
    }
    try {
        const userLogin =await User.findOne({ email: email });
        if(userLogin)
        {
          userLogin.dateofbirth= await dateofbirth;
          userLogin.education=await education;
          userLogin.address1=await address1;
          userLogin.address2=await address2;
          userLogin.pincode=await pincode;
          userLogin.city=await city;
          userLogin.state=await state;
          userLogin.country=await country
          await userLogin.save();
        }
        res.status(201).json({ message: "user registered successfully" });
      

  }catch(err){
    console.log(err);
  }
});

router.get("/home", async(req,res)=>{
  const {email}=req.body;
  const userLogin =await User.findOne({ email: email });
  
})



module.exports = router;

