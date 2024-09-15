import express from 'express'
import { login, signup ,getUserInfo} from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
const authRoute = express.Router()
authRoute.post('/signup',signup)
authRoute.post('/login',login)
authRoute.get('/userInfo',verifyToken,getUserInfo)

export default authRoute