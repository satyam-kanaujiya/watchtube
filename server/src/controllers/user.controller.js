import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


const updateUser = asyncHandler(async(req,res)=>{
    const {password} = req.body;
    
    if(password){
        throw new ApiError("You cannot update password using this endpoint");
    }
    const {id} = req.params;
    if(!(id.toString()===req.user._id.toString())){
        throw new ApiError(403,"cannot update someone else's account")
    }

    const user = await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});

    if(!user){
    throw new ApiError("Updation failed, Please try again!");
    }

    res.status(200).json(new ApiResponse("User updated successfully",{user}));

});
const deleteUser = asyncHandler(async(req,res)=>{

    const {id} = req.params;
    if((id.toString()===req.user._id.toString())){
        throw new ApiError(403,"cannot delete someone else's account")
    }

    const user = await User.findByIdAndDelete(id);

    if(!user){
    throw new ApiError("deletion failed, Please try again!");
    }

    res.status(204).clearCookie("accessToken",{httpOnly:true,secure:true}).json(new ApiResponse("User deleted successfully"));
});

const getUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    if(!user){
        throw new ApiError(404,"No user found with given id");
    }
    res.status(200).json(new ApiResponse("User fetched successfully",{user}));
});

const subscribe = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const checkChannelSubscription = await User.findOne({_id:req.user._id,subscribedChannels:{$in:[id]}});
    if(checkChannelSubscription){
        throw new ApiError(400,"You have already subscribed this channel");
    }
    const subscribedChannel = await User.findByIdAndUpdate(id,{$inc:{subscribers:1}},{new:true,runValidators:true});
    const user = await User.findByIdAndUpdate(req.user._id,{$push:{subscribedChannels:id}},{new:true});
    if(!subscribedChannel){
        throw new ApiError(404,"Channel not found");
    }
    res.status(201).json(new ApiResponse("Subscribed successfully",{user}));
});
const unsubscribe = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const checkChannelSubscription = await User.findOne({_id:req.user._id,subscribedChannels:{$in:[id]}});
    if(!checkChannelSubscription){
        throw new ApiError(400,"You are not a subscriber of this channel");
    }
    const subscribedUser = await User.findByIdAndUpdate(id,{$inc:{subscribers:-1}},{new:true,runValidators:true});
    if(!subscribedUser){
        throw new ApiError(404,"Channel not found");
    }
    const user = await User.findByIdAndUpdate(req.user._id,{$pull:{subscribedChannels:id}});
    res.status(201).json(new ApiResponse("unsubscribed successfully",{user}));
});
const likeUser = asyncHandler(async(req,res)=>{
    const {videoId} = req.params;
    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(404,"Video not found");
    };
    const updatedVideo = await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:req.user._id},
        $pull:{dislikes:req.user._id}},{new:true});

    if(!updatedVideo){
        throw new ApiError(500,"like updation failed");
    }

    res.status(200).json({...new ApiResponse("video has been liked",{video:updatedVideo}),likes:updatedVideo.likes.length});
});
const dislikeUser = asyncHandler(async(req,res)=>{
    const {videoId} = req.params;
    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(404,"Video not found");
    };
    const updatedVideo = await Video.findByIdAndUpdate(videoId,{$addToSet:{dislikes:req.user._id},$pull:{likes:req.user._id}},{new:true});

    if(!updatedVideo){
        throw new ApiError(500,"dislike updation failed");
    }

    res.status(200).json({...new ApiResponse("vidoe has been disliked",{video:updatedVideo}),dislikes:updatedVideo.dislikes.length});
});


export {updateUser,deleteUser,getUser,subscribe,unsubscribe,likeUser,dislikeUser};