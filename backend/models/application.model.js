import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

    assignment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Assignment",
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default: 'pending',
    }


},{timestamps:true})

export const Application = mongoose.model('Application',applicationSchema)