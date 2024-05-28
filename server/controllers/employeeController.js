import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import employeeModel from '../models/employeeModel.js';
import adminModel from '../models/adminModel.js';

export const signUp = async (req, res) => {
    try {
        let { name, phone, email, password } = req.body
        const employee = await employeeModel.findOne({ email: email })
        console.log('employee: ', employee);
        if (employee) {
            res.status(200).send({ exist: true, message: 'You are already registered' })
        } else {
            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password, salt)
            const employeeData = new employeeModel({
                name, phone, email, password
            })
            employeeData.save()
            res.status(200).send({ success: true, message: 'Register Successfully' })
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ message: "Error in SignUp", success: false, error })
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await employeeModel.findOne({ email: email });

        if (!employee) {
            return res.status(200).send({ message: "Incorrect Email or Password", incEmail: true });
        }

        const isMatchPswrd = await bcrypt.compare(password, employee.password);

        if (!isMatchPswrd) {
            return res.status(200).send({ message: "Incorrect Password", incPass: true });
        }

        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1y' });
        return res.status(200).send({ message: "Login Successful", success: true, data: token });

    } catch (error) {
        return res.status(500).send({ message: "Error in Login", success: false, error });
    }
};

export const dashboard = async (req, res) => {
    try {
        const id = req.body.employeeId
        console.log(req.body);
        const { totalTime, totalWorkTime, totalBreakTime } = req.body
        await employeeModel.findByIdAndUpdate(id, {
            $push: {
                attendance: [{
                    issue_date: new Date(),
                    total_time: totalTime,
                    working_time: totalWorkTime,
                    break_time: totalBreakTime
                }]
            }
        })
        // const employee = await employeeModel.findById(id)
        res.status(200).send({ message: "Today work is completed", success: true });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ message: "Error in fetching employee details", success: false, error });
    }
}

export const getList = async (req, res) => {
    try {
        const id = req.body.employeeId
        const employee = await employeeModel.findById(id)
        res.status(200).send(employee);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ message: "Error in fetching employee details", success: false, error });
    }
}

export const requestLeave = async (req, res) => {
    try {
        const id = req.body.employeeId
        const formData = req.body
        const employee = await employeeModel.findById(id)
        console.log('formData:', formData);
        const adminData = new adminModel({
            name: employee.name,
            phone: employee.phone,
            email: employee.email,
            date: formData.date,
            reason: formData.reason
        })
        adminData.save()
        res.status(200).send({ success: true, message: 'Your Request sended to admin for approval' })
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ message: "Error in fetching employee details", success: false, error });
    }
}
