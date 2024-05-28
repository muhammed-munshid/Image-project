import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
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
    date: {
        type: Date
    },
    reason: {
        type: String
    },
})


const adminModel = mongoose.model('admin', adminSchema)
export default adminModel