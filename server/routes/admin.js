import express from 'express'
import { adminSignIn } from '../controllers/adminController.js'
// import userAuth from '../middleware/userAuth.js'

const router = express.Router()


// router.post('/employee-dashboard', userAuth, getUserById)
router.post('/signIn', adminSignIn)


export default router