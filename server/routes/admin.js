import express from 'express'
import { SignIn, signUp } from '../controllers/employeeController.js'
// import userAuth from '../middleware/userAuth.js'

const router = express.Router()


// router.post('/employee-dashboard', userAuth, getUserById)
router.post('/signUp', signUp)
router.post('/signIn', SignIn)


export default router