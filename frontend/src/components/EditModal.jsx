import {useEffect, useRef, useState} from "react";

export function EditModal({ isOpened, todo, onSave, onClose, buttonContent }) {

    const [inputState, setInputState] = useState( "")
    const [textareaState, setTextareaState] = useState("")
    const modalRef = useRef(null)

    useEffect(() => {
        if ( isOpened ) {
            console.log(todo)
            todo && setInputState(todo.title)
            todo && setTextareaState(todo.description)
            modalRef.current?.showModal()
        } else modalRef.current?.close()
    }, [isOpened])



    return (
        <dialog
            className="edit-todo-modal"
            ref={ modalRef }
            onCancel={ onClose }
        >
            <div className="wrapper">
                <button
                    className="close-modal-btn"
                    onClick={ () => {
                        setInputState("")
                        setTextareaState("")
                        onClose()
                }}
                ><i className="fa-regular fa-circle-xmark"></i></button>
                <form
                    className="todo-form"
                      onSubmit={ (event) => {
                          event.preventDefault()
                          onSave(inputState, textareaState)
                          setInputState("")
                          setTextareaState("")
                          onClose()
                      }} >
                    <div className="inputs">
                        <label htmlFor="title">Title</label>
                        <input
                            value={ inputState }
                            onChange={ (event) =>
                                setInputState( event.target.value )
                            }
                            type="text" minLength={3} placeholder="Rolling the universe ✨" name="title" id="title" required={true}/>
                        <label htmlFor="description">Description</label>
                        <textarea
                            value={ textareaState }
                            onChange={ (event) =>
                                setTextareaState( event.target.value )
                        }
                            minLength={3} name="description" id="description" cols="30" rows="10" placeholder="Description of your plan" required={true}></textarea>
                    </div>
                    <button className="add-todo-btn">{buttonContent}</button>
                </form>
            </div>
        </dialog>
    )
}