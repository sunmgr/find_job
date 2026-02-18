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
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

         let cloudResponse = null;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        // 3. UPDATING DATA
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray; // Now properly defined

        // 4. RESUME UPDATE
        // Only update these fields if a new file was actually uploaded
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, { resource_type: 'raw' });
        }
        
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; 
            user.profile.resumeOriginalName = file.originalname; 
        }

        await user.save();

        // Prepare the response user object
        const updatedUser = {
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
            user: updatedUser,
        });

    } catch (error) {
        console.log("Error in updateProfile:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}