import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';

const verifyJwt = asyncHandler(async(req,res,next)=>{

    const token = req.cookies.accessToken || req.header("Authorization")?.split(" ")[1] || req.body.accessToken;

    if(!token){
        throw new ApiError(401,"Token not found");
    }

    const decode = jwt.verify(token,process.env.ACCESS_TOKEN_KEY);

    if(!decode){
        throw new ApiError(401,"Token is either expired or invalid");
    };

    const user = await User.findById(decode._id);

    if(!user){
        throw new ApiError(404,"User not found in database");
    }
     
    const checkPasswordChanged = user.isPasswordChanged(decode.iat);
    if(checkPasswordChanged){
        throw new ApiError(400,"Password has been changed, Please login again");
    }

    req.user = user;
    next();
});

export default verifyJwt;