import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
    value: String,
    createdAt: { type: Date, default: Date.now },
})

export default new mongoose.model('Todos', todoSchema)