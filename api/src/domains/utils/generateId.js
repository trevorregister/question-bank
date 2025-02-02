import mongoose from 'mongoose'

export default function generateId() {
    return new mongoose.Types.ObjectId()
}