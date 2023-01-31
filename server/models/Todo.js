import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
    todo: {type: String, required: ['todo is required']},
    createdAt: { type: Date, default: Date.now },
})

export default new mongoose.model('Todos', todoSchema)