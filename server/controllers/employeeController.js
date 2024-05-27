import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import employeeModel from '../models/employeeModel.js';

export const signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body
        const employee = await employeeModel.findOne({ email: email })
        console.log('employee: ',employee);
        if (employee) {
            res.status(401).send({ exist: true, message: 'You are already registered' })
        } else {
            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password, salt)
            const employeeData = new employeeModel({
                name, email, password
            })
            employeeData.save()
            res.status(200).send({ success: true })
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ message: "Error in SignUp", success: false, error })
    }
}

export const SignIn = async (req, res) => {
    try {
        // const { email, password } = req.body
        // const employee = await employeeModel.findOne({ email: email })
        console.log('employee: ', employee);
        res.status(200).send({ message: "Login Successfull"})
        // if (employee) {
        //     const isMatchPswrd = await bcrypt.compare(password, employee.password)
        //     if (!isMatchPswrd) {
        //         console.log('no');
        //         res.status(401).send({ message: "Incorrect Password", incPass: true })
        //     } else {
        //         console.log('yes');
        //         const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
        //             expiresIn: '1y'
        //         })
        //         console.log('token :', token);
        //         await employeeModel.findByIdAndUpdate(employee._id,{
        //             $set: {
        //                 status: true
        //             }
        //         })
        //         res.status(200).send({ message: "Login Successfull", success: true, data: token })
        //     }
        // } else {
        //     res.status(401).send({ message: "Incorrect Email or Password", incEmail: false })
        // }
    } catch (error) {
        res.status(500).send({ message: "Error in Login", success: false, error })
    }
}

export const getemployeeById = async (req, res) => {
    try {
        const id = req.body.employeeId
        const employee = await employeeModel.findById(id)
        res.status(200).send(employee);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ message: "Error in fetching employee details", success: false, error });
    }
}
