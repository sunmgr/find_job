import {Job} from "../models/job.model.js"

//admin post the job
export const postJob = async(req,res)=>{
    try{
        const {title,description,requirement,salary,location,jobType,experience,position,companyId} = req.body
        const userId =req.id
        if(!title || !description || !requirement || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirement:requirement.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
        })
        return res.status(201).json({
            message:"new job has been created",
            success:true,
            job,
        })


    }catch(error){
        console.log(error)
    }
}


//for students
export const getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || ""
        const query ={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
                
            ]
        }
        const jobs = await Job.find(query).populate({
            path:"company",

        }).sort({createdAt:-1})
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })




    }catch(error){
        console.log(error)
    }
}

//for students
export const getJobById  = async(req,res)=>{
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId)
            .populate({
                path:"applications",
                populate:{
                    path:"applicant",
                    select:"_id"
                }
            })
            .populate({
                path:"company"
            })
        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

//admin get all his job
export const getAdminJobs = async(req,res)=>{
    try {
        const adminId = req.id
        const jobs = await Job.find({created_by:adminId}).populate({
            path:"company",
        }).sort({createdAt:-1})
        

        if (!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}