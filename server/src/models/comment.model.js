import mongoose,{Schema} from "mongoose";

const commentSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"userId is required field"],
    },
    videoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video",
        required:[true,"videoId is required field"]
    },
    desc:{
        type:String,
        required:[true,"comment desc is required field"]
    }
},{timestamps:true});

export const Comment = mongoose.model("Comment",commentSchema); 