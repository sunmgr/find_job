import express from "express"
import isAutheticated from "../middlewares/isAutheticated.js"
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js"

const router = express.Router()

router.route("/post").post(isAutheticated,postJob)
router.route("/get").get(isAutheticated,getAllJobs)
router.route("/getadminjobs").get(isAutheticated,getAdminJobs)
router.route("/get/:id").get(isAutheticated,getJobById)

export default router