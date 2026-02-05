import {Router} from "express"
import {matchResumeWithJob, getJobMatchHistory, getSingleJobMatch} from "../controllers/jobMatch.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/match").post(verifyJWT, matchResumeWithJob)
router.route("/history").get(verifyJWT, getJobMatchHistory)
router.route("/singleJobMatchResult/:jobMatchId").get(verifyJWT, getSingleJobMatch)


export default router;