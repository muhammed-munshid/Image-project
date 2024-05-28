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
    block: {
        type: Boolean,
        default: false
    },
    attendance: [{
        issue_date: {
            type: Date
        },
        total_time : {
            type: String
        },
        break_time : {
            type: String
        },
        working_time : {
            type: String
        },
        leave: {
            type: Boolean
        }
    }]
})


const employeeModel = mongoose.model('employees', employeeSchema)
export default employeeModel