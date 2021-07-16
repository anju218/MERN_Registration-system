const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cpassword:{
        type: String,
        required:true
    },
    code:{
        type:String
    },
    dateofbirth:{
        type:String,
        required:false
    },
    address1:{
        type:String,
        required:false
    },
    address2:{
        type:String,
        required:false
    },
    pincode:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
    
    file:{
        type:String
    },
    tokens:[
        {
            token: {
                type: String,
                required:true
            }
        }
    ]
})



userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}    


const User = mongoose.model('USERS',userSchema);

module.exports = User;