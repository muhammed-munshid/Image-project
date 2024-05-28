import express from 'express'
import { adminDashboard, adminSignIn, blockEmployee, employeeDetails, leaveForms } from '../controllers/adminController.js'

const router = express.Router()

router.get('/dashboard', adminDashboard)
router.get('/employee-details/:id', employeeDetails)
router.get('/leave-forms', leaveForms)

router.post('/signIn', adminSignIn)
router.post('/block-employee/:id', blockEmployee)


export default router