import {Router} from "express";
import Todo from "../models/Todo.js"
const router = Router()

// Route to get all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({})
        return res.status(200).json({
            count: todos.length,
            data: { todos }
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

// Route to get todo by id
router.get("/:todoId", async (req, res) => {
    try {
        const {todoId} = req.params
        const todo = await Todo.findById(todoId)
        if ( todo === null ) return res.status(500).json({ message: "Todo not found...❌" })
        else return res.status(200).json(todo)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

// Route to add a todo
router.post("/" , async (req, res) => {
    try {
        const todoBody = req.body
        const todo = new Todo({
            title: todoBody.title,
            description: todoBody.description,
            completed: todoBody.completed
        })
        await todo.save()
        return res.status(200).json({
            message: "Todo has been added...✔",
            todo: todo
        })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

// Route to delete a todo
router.delete("/:todoId", async (req, res) => {
    try {
        const { todoId } = req.params
        const todo = await Todo.findByIdAndDelete(todoId)
        if ( todo === null ) return res.status(500).json({ message: "Todo not found...❌" })
        else return res.status(200).json({ message: "Todo has been deleted...✔" })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

// Route to update an existing todo
router.put("/:todoId", async (req, res) => {
    try {
        const {todoId} = req.params
        const todoToUpdate = req.body
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todoToUpdate, { new: true })
        if ( updatedTodo === null ) return res.status(500).json({ message: "Todo not found...❌" })
        else return res.status(200).json({ message: "Todo updated successfully✔", updatedTodo })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
})

export default router