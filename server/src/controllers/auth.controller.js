import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const options = {
    httpOnly:true,
    sameSite:"Lax"
};

if(process.env.NODE_ENV==="production"){
    options.secure = true;
};

const signup = asyncHandler(async(req,res)=>{
    const {username,password,email} = req.body;

    if([username,password,email].some((field)=>field === undefined)){
        throw new ApiError(400,"Please fill all required fields");
    };

    if([username,password,email].some((field)=>field.trim()==="")){
        throw new ApiError(400,"Please fill all the fields");
    };

    if(!email.includes('@')){
        throw new ApiError(400,"Please provide valid email");
    };

    const newUser = await User.create(req.body);

    if(!newUser){
        throw new ApiError(500,"Error while creating new user");
    }

    const accessToken = newUser.generateAccessToken();

    res.status(201).cookie("accessToken",accessToken,options).json({...new ApiResponse("sign up successfull",{user:newUser}),accessToken});
});

const signin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        throw new ApiError(400,"Please fill all the fields")
    }

    if([password,email].some((field)=>field.trim()==="")){
        throw new ApiError(400,"Please fill all the fields correctly");
    };

    if(!email.includes('@')){
        throw new ApiError(400,"Please provide valid email");
    };

    const getUser = await User.findOne({email});

    if(!getUser){
        throw new ApiError(404,"User not found");
    };
    if(!(await getUser.checkPassword(password))){
        throw new ApiError(400,"Incorrect Password");
    }

    const accessToken = getUser.generateAccessToken();

    return res.status(200).cookie("accessToken",accessToken,options).json({...new ApiResponse("login successful",{user:getUser}),accessToken});
});
const googleSignIn = asyncHandler(async(req,res)=>{

    const {email,username,img} = req.body;

    if(!email || !username){
        throw new ApiError(400,"Please fill all the fields")
    }

    if([username,email].some((field)=>field.trim()==="")){
        throw new ApiError(400,"Please fill all the fields correctly");
    };

    if(!email.includes('@')){
        throw new ApiError(400,"Please provide valid email");
    };

    const user = await User.findOne({email});
    if(user){
        const accessToken = user.generateAccessToken();
        return res.status(200).cookie("accessToken",accessToken,options).json({...new ApiResponse("login successful",{user})});
    }else{
        const newUser = new User({email,img,username,fromGoogle:true});
        await newUser.save();
        const accessToken = newUser.generateAccessToken();
        return res.status(200).cookie("accessToken",accessToken,options).json({...new ApiResponse("login successful using google Authentication",{user:newUser})});
    }
});

export {signup,signin,googleSignIn};