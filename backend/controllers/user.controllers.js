import {User} from "../models/user.models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // 1. Check for required text fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Handle Optional File Upload
        const file = req.file;
        let cloudResponse = null;

        if (file) {
            const fileUri = getDataUri(file);
            // Only access .content if fileUri exists
            if (fileUri) {
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }
        }

        // 3. Create User with Conditional Photo
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                // If cloudResponse exists, use the URL; otherwise, leave it empty/null
                profilePhoto: cloudResponse ? cloudResponse.secure_url : ""
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log("error in register controller", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


export const login = async(req,res) =>{
    try{
        const {email,password,role}  = req.body
        if( !email ||  !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        let user = await User.findOne({email})
        if(!user)
            return res.status(400).json({
                message:"incorrect email or password",
                success:false
            })
        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if (!isPasswordMatch){
            return res.status(400).json({
                message:"incorrect email or passowrd",
                success:false
            })
        }

        if(role != user.role){
                return res.status(400).json({
                message:"Account doesn't exist with current role",
                success:false
            })
        }

        const tokenData = {
            userId:user._id,
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{
            expiresIn:'1d'
        })
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true ,sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })

    }catch(error){
        console.log(error)

    }
}
export const logout = async(req,res) =>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged out successfullly",
            success:true
        })
    }catch(error){
        console.log(error)
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        const userId = req.id; // middleware authentication

        // 1. Prepare Update Object
        const updateData = {};
        if (fullname) updateData.fullname = fullname;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        
        // Use dot notation for nested profile fields to prevent overwriting the whole object
        if (bio) updateData["profile.bio"] = bio;
        
        if (skills) {
            updateData["profile.skills"] = typeof skills === 'string' 
                ? skills.split(",").map(skill => skill.trim()) 
                : skills;
        }

        // 2. Handle File Upload (Cloudinary)
        if (file) {
            const fileUri = getDataUri(file);
            // Resource type 'raw' is for PDFs/Docs, 'auto' for images
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, { 
                resource_type: 'auto' 
            });

            if (cloudResponse) {
                updateData["profile.resume"] = cloudResponse.secure_url;
                updateData["profile.resumeOriginalName"] = file.originalname;
            }
        }

        // 3. ATOMIC UPDATE (Replaces .save() to prevent VersionError)
        const user = await User.findByIdAndUpdate(
            userId, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // 4. Return formatted response
        const responseUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: responseUser,
        });

    } catch (error) {
        console.log("Error in updateProfile:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getLeaderboard = async (req, res) => {
    try {
        // 1. Fetch Students (Heroes) + their completed assignment count
        const heroes = await User.aggregate([
            { $match: { role: 'student' } },
            {
                $lookup: {
                    from: "applications", // collection name in MongoDB
                    localField: "_id",
                    foreignField: "applicant",
                    as: "appliedData"
                }
            },
            {
                $addFields: {
                    completedCount: {
                        $size: {
                            $filter: {
                                input: "$appliedData",
                                as: "app",
                                cond: { $eq: ["$$app.status", "accepted"] }
                            }
                        }
                    }
                }
            },
            { $sort: { completedCount: -1, createdAt: 1 } },
            { $project: { password: 0, appliedData: 0 } } // Security: hide password
        ]);

        // 2. Fetch Recruiters (Vanguards) + their posted assignment count
        const vanguards = await User.aggregate([
            { $match: { role: 'recruiter' } },
            {
                $lookup: {
                    from: "assignments",
                    localField: "_id",
                    foreignField: "created_by",
                    as: "postedAssignments"
                }
            },
            {
                $addFields: {
                    postCount: { $size: "$postedAssignments" },
                    totalBountyPaid: { $sum: "$postedAssignments.budget" }
                }
            },
            { $sort: { totalBountyPaid: -1, postCount: -1 } },
            { $project: { password: 0, postedAssignments: 0 } }
        ]);

        return res.status(200).json({
            success: true,
            heroes, // Students
            vanguards // Recruiters
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getProfile = async(req,res) =>{
    try{
        const userId = req.params.id || req.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
        return res.status(200).json({
            user,
            success:true
        })


    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal server error", success: false });
   
    }
}