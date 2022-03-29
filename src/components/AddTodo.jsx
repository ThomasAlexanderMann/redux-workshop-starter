import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todos/todosSlice";
import { v4 } from "uuid";

export default function AddTodo() {
  const [todoText, setTodoText] = useState("");

  const dispatch = useDispatch();

  function handleAddTodo(e) {
    e.preventDefault();
    // update redux
    dispatch(addTodo({ id: v4(), text: todoText }));
    setTodoText("");
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
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button id="add" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
