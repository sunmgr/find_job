import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirement:{
        type:[String],
        
    },
    budget:{
        type:Number,
        required:true
    },
    subject:{
        type:String,
        required:true
    },

    

    position:{
        type:Number,
        required:true
    },
    created_by:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Application',
    }
},{timestamps:true})

export const Assignment = mongoose.model("Assignment",assignmentSchema)