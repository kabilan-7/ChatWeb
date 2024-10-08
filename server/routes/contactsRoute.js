import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { searchContacts } from '../controllers/contactsController.js'

const contactRoutes = express.Router()
contactRoutes.post('/search',verifyToken,searchContacts)

export default contactRoutes