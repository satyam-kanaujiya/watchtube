import ApiError from "./ApiError.js";
const customError = ((err,req,res,next) => {
    if(process.env.NODE_ENV === "production")
    {
        if(err instanceof ApiError){
            return res.status(err.statusCode).json({
                success:err.success,
                message:err.message,
            });
        }else if(err?.name === "CastError"){
            return res.status(400).json({
                success:false,
                message:`${err.path} is not valid, value entered ${err.value}`,
            });

        }else if(err?.code === 11000){
            return res.status(401).json({
                success:false,
                message:`dublicate value for property ${Object.keys(err.keyValue)[0]} and its value ${Object.values(err.keyValue)[0]}`
            })
        }else{
            return res.status(500).json({
                success:false,
                message:err.message || "Something went wrong",
            });
        }
    }
    else {
        if(err instanceof ApiError){
            return res.status(err.statusCode).json({
                success:err.success,
                message:err.message,
                error:err
            });
        }else if(err?.name === "CastError"){
            return res.status(400).json({
                success:false,
                message:`${err.path} is not valid, value entered ${err.value}`,
                error:err
            });

        }else if(err?.code === 11000){
            return res.status(401).json({
                success:false,
                message:`dublicate value for property ${Object.keys(err.keyValue)[0]} and its value ${Object.values(err.keyValue)[0]}`
            })
        }else{
            return res.status(500).json({
                success:false,
                message:err.message || "Something went wrong",
                error:err
            });
        }
    }
});

export default customError;