import {Assignment} from "../models/assignment.model.js"

//poster posts the assignment
export const postAssignment = async(req,res)=>{
    try{
        const {title,description,requirement,budget,subject,position} = req.body
        const userId =req.id
        if(!title || !description || !requirement || !budget || !subject   || !position){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }
        const assignment = await Assignment.create({
            title,
            description,
            requirement:requirement.split(","),
            budget:Number(budget),
            subject,
            
            position,

            created_by:userId
        })
        return res.status(201).json({
            message:"new assignment has been created",
            success:true,
            assignment,
        })


    }catch(error){
        console.log(error)
    }
}


// backend/controllers/assignment.controller.js

export const getAllAssignments = async(req,res)=>{
    try{
        const keyword = req.query.keyword || ""
        const query ={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        }
        const assignments = await Assignment.find(query)
            .populate({
                path: "created_by",
                select: "fullname" // Security: only get the name
            })
            .sort({createdAt:-1});

        if(!assignments){
            return res.status(404).json({
                message:"assignments not found",
                success:false
            })
        }
        return res.status(200).json({
            assignments,
            success:true
        })
    } catch(error){
        console.log(error)
    }
}

// for students
export const getAssignmentById = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        
        // ADDED .populate("created_by", "fullname") here
        const assignment = await Assignment.findById(assignmentId)
            .populate({
                path: "applications",
                populate: {
                    path: "applicant",
                    select: "_id"
                }
            })
            .populate({
                path: "created_by",
                select: "fullname _id" // Only fetch the name to keep it secure
            });
            
        if (!assignment) {
            return res.status(404).json({
                message: "assignment not found",
                success: false
            });
        }
        
        return res.status(200).json({
            assignment,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
//admin get all their assignments
export const getPosterAssignments = async(req,res)=>{
    try {
        const adminId = req.id
        const assignments = await Assignment.find({created_by:adminId}).sort({createdAt:-1})
        

        if (!assignments){
            return res.status(404).json({
                message:"assignments not found",
                success:false
            })
        }
        return res.status(200).json({
            assignments,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}