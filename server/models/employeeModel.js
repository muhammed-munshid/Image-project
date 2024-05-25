import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number,
        default: 0
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "Admin"
    }
})


const employeeModel = mongoose.model('employees', employeeSchema)
export default employeeModel