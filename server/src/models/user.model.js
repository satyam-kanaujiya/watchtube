import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Username is required field"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required field"],
        unique:true
    },
    password:{
        type:String
    },
    passwordChangedAt:{
        type:Date
    },
    img:{
        type:String,
        default:""
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedChannels:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
        default:[]
    },
    fromGoogle:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

userSchema.virtual("passwordRequired").get(function(){
    return !this.fromGoogle;
});

userSchema.set("toJSON",{
    transform:(doc,val) =>{
        delete val.password;
    }
});
userSchema.set("toObject",{
    transform:(doc,val) =>{
        delete val.password;
    }
});
userSchema.pre("save",async function(next){
    if(this.passwordRequired){
        if(!this.isModified("password")) return next();
        // this.password is accessible even if select:false
        this.password = await bcrypt.hash(this.password,10);
        this.passwordChangedAt = Date.now();
        next();
    }
    next();
});

userSchema.pre(/^find/,function(next){
    this.select("-__v");
    next();
});

userSchema.methods.checkPassword = async function(password){
    // this.password is only accessible if select:false
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email
    },
    process.env.ACCESS_TOKEN_KEY,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    });
};

userSchema.methods.isPasswordChanged = function(jwtToken){
    return parseInt(this.passwordChangedAt.getTime() / 1000) > jwtToken
};

export const User = mongoose.model("User",userSchema);