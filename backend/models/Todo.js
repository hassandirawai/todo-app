import mongoose from "mongoose";

const Schema = mongoose.Schema

const TodoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: false, default: false }
})

const Todo = mongoose.model("Todo", TodoSchema)
export default Todo