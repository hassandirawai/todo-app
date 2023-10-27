import {useState} from "react";
import {EditModal} from "./EditModal.jsx";
import axios from "axios";

export default function TodoItem({todo, onDelete, onComplete, getTodos}) {

    const [state, setState] = useState(todo)
    const [modalState, setModalState] = useState(false)

    const saveTodo = (title, description) => {
        const todoBody = { title: title, description: description }
        axios.put(`https://todo-app-usin.onrender.com/todos/${todo._id}`, todoBody)
            .then( (res) => {
                console.log(res.data)
                setState(res.data.updatedTodo)
                getTodos()
            }).catch( (err) => console.log({ message: err }) )
    }

    return (
        <div className="todo-item">
            <div className="wrapper">
                <div onClick={ () => {
                    if ( state.completed === false ) {
                        setState({...state, completed: true})
                        onComplete(true, state._id)
                    }
                    else {
                        setState({...state, completed: false})
                        onComplete(false, state._id)
                    }
                }
                } className="container">
                    <input name="checkbox" onChange={ () => null } type="checkbox" checked={state.completed}/>
                    <div className="checkmark"></div>
                </div>
                <div data-checked={state.completed} className="todo-content">
                    <span className="todo-header">{todo.title}</span>
                    <p>{todo.description}</p>
                </div>
                <div className="todo-btns">
                    <div
                        onClick={ () => setModalState(true) }
                        className="todo-edit-btn">
                        <i className="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div onClick={ () => onDelete(todo._id) } className="todo-delete-btn">
                        <i className="fa-regular fa-trash-can"></i>
                    </div>
                </div>
            </div>
            { modalState &&
                <EditModal
                    isOpened={ modalState }
                    todo={ todo }
                    onSave={ (title, description) => saveTodo(title, description) }
                    onClose={ () => setModalState(false) }
                    buttonContent={ <><span>Save Todo</span><i className="fa-regular fa-floppy-disk"></i></> }
                />
            }
        </div>
    )
}