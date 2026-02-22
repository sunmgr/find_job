import express from "express"
import isAutheticated from "../middlewares/isAutheticated.js"
import { getPosterAssignments, getAllAssignments, getAssignmentById, postAssignment } from "../controllers/assignment.controller.js"

const router = express.Router()

router.route("/post").post(isAutheticated,postAssignment)
router.route("/get").get(isAutheticated,getAllAssignments)
router.route("/getadminassignments").get(isAutheticated,getPosterAssignments)
router.route("/get/:id").get(isAutheticated,getAssignmentById)

export default router