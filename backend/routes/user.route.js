import express from "express"
import { register, updateProfile,login,logout } from "../controllers/user.controllers.js"
import isAutheticated from "../middlewares/isAutheticated.js"
import { singleUpload } from "../middlewares/multer.js"

const router = express.Router()

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/logout").get(logout)

router.route("/profile/update").post(isAutheticated,singleUpload,updateProfile)


export default router