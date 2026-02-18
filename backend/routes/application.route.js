import express from "express"
import isAutheticated from "../middlewares/isAutheticated.js"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"

const router = express.Router()

router.route("/apply/:id").get(isAutheticated,applyJob)
router.route("/get").get(isAutheticated,getAppliedJobs)
router.route("/:id/applicants").get(isAutheticated,getApplicants)
router.route("/status/:id/update").post(isAutheticated,updateStatus)


export default router