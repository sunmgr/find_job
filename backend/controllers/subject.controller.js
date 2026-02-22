import {Subject} from "../models/subject.model.js"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"




export const registerSubject = async(req,res) =>{
    try {
        const {subjectName} = req.body
        if(!subjectName){
            return res.status(400).json({
                message:"subject name is required",
                success:false
            })
        }
        let subject = await Subject.findOne({name:subjectName})
            if(subject){
                return res.status(400).json({
                    message:"already register",
                    success:false
                })
            }
        subject = await Subject.create({
            name:subjectName,
            userId:req.id
        })

        return res.status(201).json({
            message:"subject register successfully",
            success:true,
            subject,
        })

    } catch (error) {
        console.log(error)
    }
}

export const getSubjects = async(req,res)=>{
    try {
        const userId = req.id // login in user id
        const subjects = await Subject.find({userId})
        if(!subjects){
            return res.status(404).json({
                message:"subjects not found",
                success:false
            })
        }
        return res.status(200).json({
            subjects,
            success:true,
        })


    } catch (error) {
        console.log(error)
    }
}

//getsubect by id
export const getSubjectById = async(req,res)=>{
    try{    
        const subjectId = req.params.id
        const subject = await Subject.findById(subjectId)
        if(!subject){
            return res.status(404).json({
                message:"subject not found",
                success:false
            })

        }
        return res.status(200).json({
            subject,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}

export const updateSubject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const file = req.file;
        let logo = "";

        // Only upload to cloudinary if a new file is actually provided
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = { name, description };
        if (logo) updateData.logo = logo; // Only add logo if it was updated

        const subject = await Subject.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!subject) {
            return res.status(404).json({
                message: "subject not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Subject information updated successfully.",
            subject, // Return the updated subject object!
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}