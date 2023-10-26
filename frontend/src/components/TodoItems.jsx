import TodoItem from "./TodoItem.jsx";
import React from "react";

export default function TodoItems({todosList, onDelete, onComplete, getTodos}) {

    const todos = todosList

    const completedTodos = todos.filter( (todo) => todo.completed ).length

    return (
        <div className="todo-items">
                <div className="wrapper">
                    <div className="todo-counters">
                        <div>
                            <p>Todos:</p>
                            <span>{todos.length}</span>
                        </div>
                        <div>
                            <p>Completed:</p>
                            <span>{todos.length > 0 ? completedTodos : 0} of {todos.length}</span>
                        </div>
                    </div>
                    {
                        todos !== [] &&
                        <ol>
                            {
                                todos.map((todo) => { return <li key={todo._id}>
                                    <TodoItem
                                        todo={todo}
                                        onComplete={ (completeState, todoId) => onComplete(completeState, todoId) }
                                        onDelete={ (todoId) => onDelete(todoId) }
                                        getTodos={ getTodos }
                                    />
                                </li> })
                            }
                        </ol>
                    }
                </div>
            </div>
    )
}