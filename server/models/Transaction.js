import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchma = new Schema({
    amount: Number,
    description: String,
    date: { type: Date, default: new Date() },
    createdAt: { type: Date, default: Date.now }
})

export default new mongoose.model('Transaction', transactionSchma)