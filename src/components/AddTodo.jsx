import React, { useState } from "react";

export default function AddTodo({addNewTodo}) {
    const [todoText, setTodoText] = useState("");
    
    function handleAddTodo(e) {
        e.preventDefault()
        addNewTodo(todoText)
        setTodoText("")
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
