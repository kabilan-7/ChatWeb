import express from 'express'
import { login, signup ,getUserInfo, updateProfile,addProfileImage,removeProfileImage, logout} from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
import multer from 'multer'
const authRoute = express.Router()
const upload = multer({dest:"uploads/profiles/"})
authRoute.post('/signup',signup)
authRoute.post('/login',login)
authRoute.get('/userInfo',verifyToken,getUserInfo)
authRoute.post('/update-profile',verifyToken,updateProfile)
authRoute.post('/add-profile-image',verifyToken,upload.single("profile-image"),addProfileImage)
authRoute.delete("/remove-profile-image",verifyToken,removeProfileImage)
authRoute.post("/logout",logout)

export default authRoute