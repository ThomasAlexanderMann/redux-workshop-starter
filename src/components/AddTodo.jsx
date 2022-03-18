import React, { useState } from "react";
// Imports for redux
import { useDispatch } from "react-redux";
// this library creates unique IDs:
import {v4} from 'uuid'


export default function AddTodo() {
	const [todoText, setTodoText] = useState("");
	const dispatch = useDispatch()
    
    function handleAddTodo(e) {
        e.preventDefault()
		setTodoText("")
		dispatch({
			type: 'todos/todoAdded',
			payload: {
				id: v4(),
				text: todoText,
				status: 'incomplete'
			}
		})
    }

	return (
		<div className="add-todo">
			<form onSubmit={handleAddTodo} className="input-form">
				<label htmlFor="todo-input">I need to... </label>
				<input
					id="todo-input"
					type="text"
					maxLength={25}
					value={todoText}
					onChange={e => setTodoText(e.target.value)}
				/>
				<button id="add" type="submit">Add</button>
			</form>
		</div>
	);
}
