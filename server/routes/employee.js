import express from 'express'
import { dashboard, signIn, signUp } from '../controllers/employeeController.js'
import employeeAuth from '../middleware/employeeAuth.js'

const router = express.Router()


router.post('/dashboard', employeeAuth, dashboard)
router.post('/signUp', signUp)
router.post('/signIn', signIn)


export default router