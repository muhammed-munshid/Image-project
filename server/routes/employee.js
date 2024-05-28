import express from 'express'
import { dashboard, getList, requestLeave, signIn, signUp } from '../controllers/employeeController.js'
import employeeAuth from '../middleware/employeeAuth.js'

const router = express.Router()


router.post('/dashboard', employeeAuth, dashboard)
router.post('/get-list', employeeAuth, getList)
router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/request-leave', employeeAuth, requestLeave)

export default router