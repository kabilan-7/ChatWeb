import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware'
import { searchContacts } from '../controllers/contactsController'

const contactRoutes = express.Router()
contactRoutes.post('/search',verifyToken,searchContacts)

export default contactRoutes