import express from "express"
import isAutheticated from "../middlewares/isAutheticated.js"
import { applyAssignment, getSolvers, getAppliedAssignments, updateStatus } from "../controllers/application.controller.js"

const router = express.Router()

router.route("/apply/:id").get(isAutheticated,applyAssignment)
router.route("/get").get(isAutheticated,getAppliedAssignments)
router.route("/:id/solvers").get(isAutheticated,getSolvers)
router.route("/status/:id/update").post(isAutheticated,updateStatus)


export default router