import {Router} from 'express'
import {uploadResume, deleteResume, getAllResume} from "../controllers/resume.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route("/upload-resume").post(verifyJWT, upload.single("resume"), uploadResume)
router.route("/get-resume").get(verifyJWT, getAllResume)
router.route("/delete/:resumeId").delete(verifyJWT, deleteResume)

export default router;