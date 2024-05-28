import employeeModel from "../models/employeeModel.js"

export const adminSignIn = async (req, res) => {
    try {
        const adminData = req.body
        const email = adminData.email
        const password = adminData.password
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            res.status(200).send({ message: "Login Successfull", success: true })
        } else {
            console.log('Inc');
            res.status(401).send({ message: "Incorrect email or password", incEmail: true })
        }
    } catch (error) {
        console.log('login', error);
        res.status(500).send({ message: "Error in Login", success: false, error })
    }
}

export const adminDashboard = async (req, res) => {
    try {
        const employees = await employeeModel.find()
        res.status(200).send({ data: employees })
    } catch (error) {
        console.log('login', error);
        res.status(500).send({ message: "Error in Login", success: false, error })
    }
}

export const employeeDetails = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const employee = await employeeModel.findById(id)
        res.status(200).send({ data: employee })
    } catch (error) {
        console.log('login', error);
        res.status(500).send({ message: "Error in Login", success: false, error })
    }
}
