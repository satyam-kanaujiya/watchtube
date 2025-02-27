import mongoose,{Schema} from "mongoose";

const videoSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"userId is required field"],
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    tags:{
        type:[String],
        default:[]
    },
    likes:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
        default:[]
    },
    dislikes:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
        default:[]
    },
  
},{timestamps:true});

export const Video = mongoose.model("Video",videoSchema); 