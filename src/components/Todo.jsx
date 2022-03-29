import React from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../redux/todos/todosSlice";

export default function Todo({ id, text, status }) {
  const dispatch = useDispatch();

  function handleDeleteTodo(id) {
    dispatch(deleteTodo({ id }));
  }

  function handleUpdateStatus(id, status) {
    dispatch(updateTodo({ id, status }));
  }

  return (
    <div className="todo">
      <div className="text-cont">
        <p>{text}</p>
      </div>
      <button onClick={() => handleDeleteTodo(id)} className="delete">
        Delete
      </button>
      <select
        value={status}
        onChange={(e) => handleUpdateStatus(id, e.target.value)}
      >
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
