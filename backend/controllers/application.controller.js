import {Application} from "../models/application.model.js"
import {Assignment} from "../models/assignment.model.js"


export const applyAssignment = async(req,res) =>{
    try {
        const userId = req.id
        const assignmentId = req.params.id

        if(!assignmentId){
            return res.status(400).json({
                message:"assignment id is required",
                success:false
            })
        }
        //check if the user has already applied for this assignment
        const existingApplication = await Application.findOne({assignment:assignmentId,applicant:userId})
        if(existingApplication){
            return res.status(400).json({
                message:"you have already applied for this assignment",
                success:false
            })
        }
        //check if the assignment exists
        const assignment = await Assignment.findById(assignmentId)
        if(!assignment){
            return res.status(404).json({
                message:"assignment not found",
                success:false
            })
        }

        //createa new application
        const newApplication  =  await Application.create({
            assignment:assignmentId,
            applicant:userId
        })

        assignment.applications.push(newApplication._id)
        await assignment.save()
        return res.status(201).json({
            message:"assignment applied successfully",
            success:true
        })


    } catch (error) {
        console.log(error)
    }
}

export const getAppliedAssignments = async(req,res)=>{
    try {
        const userId = req.id
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'assignment',
            options :{sort:{createdAt:-1}}
        })
        if(!application){
            return res.status(404).json({
                message:"no application",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })


    } catch (error) {
        console.log(error)
    }
}

//for poster to see the applied solvers
export const getSolvers  = async(req,res)=>{
    try {
        const assignmentId = req.params.id
        const assignment =await Assignment.findById(assignmentId).populate({
            path:"applications",
            option:{sort:{createAt:-1}},
            populate:{
                path:'applicant',
               
            }
        })

        if(!assignment){
            return res.status(404).json({
                message:"assignment not found",
                success:false
            })
        }

        return res.status(200).json({
            assignment,
            sucess:true
        })


    } catch (error) {
        console.log(error)
    }
}

export const updateStatus = async(req,res) =>{
    try {
        const {status} = req.body
        const applicationId = req.params.id
        if(!status){
            return res.status(400).json({
                messsage:'status is required',
                success:false
            })
        }
        // find the application by application id
        const application =  await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({
                message:"applicatoin not found",
                sucess:false
            })
        }

        //update the status
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            application,
            message:"Status updated sucessfully",
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}
