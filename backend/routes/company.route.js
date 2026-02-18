import express from "express"
import isAutheticated from "../middlewares/isAutheticated.js"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js"
import { singleUpload } from "../middlewares/multer.js"
const router = express.Router()

router.route("/register").post(isAutheticated,registerCompany)
router.route("/get").get(isAutheticated,getCompany)
router.route("/get/:id").get(isAutheticated,getCompanyById)
router.route('/update/:id').put(isAutheticated,singleUpload,updateCompany)


export default router