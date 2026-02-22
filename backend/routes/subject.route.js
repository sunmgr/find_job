import express from "express"
import isAutheticated from "../middlewares/isAutheticated.js"
import { getSubjects, getSubjectById, registerSubject, updateSubject } from "../controllers/subject.controller.js"
import { singleUpload } from "../middlewares/multer.js"
const router = express.Router()

router.route("/register").post(isAutheticated,registerSubject)
router.route("/get").get(isAutheticated,getSubjects)
router.route("/get/:id").get(isAutheticated,getSubjectById)
router.route('/update/:id').put(isAutheticated,singleUpload,updateSubject)


export default router