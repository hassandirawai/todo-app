import TodoItems from "./components/TodoItems.jsx";
import "./todo.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {EditModal} from "./components/EditModal.jsx";

export default function TodoApp() {

    // states
    const [todosListState, setTodosListState] = useState([])
    const [modalState, setModalState] = useState(false)
    const [getTodos, setGetTodos] = useState(false)



    // Get all todos from server
    useEffect(() => {
        axios.get("https://todo-app-usin.onrender.com/todos")
            .then( (res) => {
                setTodosListState(res.data.data.todos.reverse())
                setGetTodos(false)
            }).catch( (err) => console.log({ message: err }) )
    }, [getTodos])

    const addTodo = (title, description) => {
        const todoBody = { title: title, description: description }
        axios.post("https://todo-app-usin.onrender.com/todos", todoBody)
            .then( (res) => {
                console.log(res.data)
                setGetTodos(true)
            }).catch( (err) => console.log({ message: err }) )
    }

    const deleteTodoById = (todoId) => {
        axios.delete(`https://todo-app-usin.onrender.com/todos/${todoId}`)
            .then( (res) => {
                console.log(res.data)
                setGetTodos(true)
            }).catch( (err) => console.log({ message: err }) )
    }

    const completeTodo = (completeState, todoId) => {
        axios.put(`https://todo-app-usin.onrender.com/todos/${todoId}`, { completed: completeState })
            .then( (res) => {
                console.log(res.data)
                setGetTodos(true)
            }).catch( (err) => console.log({ message: err }) )
    }

    return (
        <main className="todo">
            <div className="wrapper">
                <div className="todo-title">
                    <h1> <span>🚀</span> <span>to</span><span>do</span> </h1>
                </div>

                <div className="todos-content">
                    <button
                        onClick={ () => setModalState(true) }
                        className="add-todo-btn">
                        <span>Add Todo</span><i className="fa-regular fa-plus"></i>
                    </button>
                    <TodoItems
                        todosList={ todosListState }
                        onComplete={ (completeState, todoId) => completeTodo(completeState, todoId) }
                        onDelete={ (todoId) => deleteTodoById(todoId) }
                        getTodos={ () => setGetTodos(true) }
                    />
                </div>
            </div>
            {modalState && <EditModal
                isOpened={modalState}
                todo={null}
                onSave={(title, description) => addTodo(title, description)}
                onClose={() => setModalState(false)}
                buttonContent={ <><span>Add Todo</span><i className="fa-regular fa-plus"></i></> }
            />}
        </main>
    )
}