import {Router} from "express"
import {register, verifyEmail, resendOtp, login, logout, passwordChange, getUser, refreshAccessToken} from "../controllers/user.controller.js" 
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(register)
router.route("/email-verify").post(verifyEmail)
router.route("/resend-otp").post(resendOtp)
router.route("/login").post(login)
router.route("/logout").get(verifyJWT, logout)
router.route("/change-password").patch(verifyJWT, passwordChange)
router.route("/getuser").get(verifyJWT, getUser)
router.route("/refresh-token").post(refreshAccessToken);

export default router;