import express from 'express'
import { login, signup ,getUserInfo, updateProfile} from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
const authRoute = express.Router()
authRoute.post('/signup',signup)
authRoute.post('/login',login)
authRoute.get('/userInfo',verifyToken,getUserInfo)
authRoute.post('/update-profile',verifyToken,updateProfile)

export default authRoute