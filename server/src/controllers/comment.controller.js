import {Comment} from '../models/comment.model.js';
import {Video} from '../models/video.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const createComment = asyncHandler(async(req,res)=>{
    const {desc} = req.body;
    const {videoId} = req.params;
    if(!desc || desc.trim()===""){
        throw new ApiError(400,"Please write something to comment");
    }
    const comment = await Comment.create({...req.body,userId:req.user._id,videoId:videoId});
    
    res.status(201).json(new ApiResponse("comment added",{comment}));
});
const getComments = asyncHandler(async(req,res)=>{
    const {videoId} = req.params;
    let comments;
    if(videoId){
        comments = await Comment.find({videoId});
    }else{
        comments = [];
    }

    res.status(200).json(new ApiResponse("Comments fetched successfully",{comments}));
});
const deleteComment = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    const comment = await Comment.findById(id);
    const video = await Video.findById(comment.videoId);

    if(!(comment && video)){
        throw new ApiError(404,"Comment or Video not found");
    }

    const checkUser = (req.user._id.toString() === comment.userId.toString()) || (req.user._id.toString() === video.userId.toString()); 
    if(!checkUser){
        throw new ApiError(401,"You cannot delete this comment");
    } 
    const deletedComment = await Comment.findByIdAndDelete(id);

    res.status(204).json({success:true});
});


export {createComment,deleteComment,getComments};
