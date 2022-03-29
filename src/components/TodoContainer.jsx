import React, { useState } from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";

export default function TodoContainer() {
  const [filter, setFilter] = useState(false);

  const todos = useSelector((state) => state.todos.allTodos);
  console.log(todos);

  function filterTodos(todos) {
    if (filter) {
      return todos.filter((todo) => todo.status === "completed");
    }
    return todos;
  }

  return (
    <div className="todo-container">
      <button
        onClick={() => setFilter(!filter)}
        style={{ width: "15rem", backgroundColor: "rebeccapurple" }}
      >
        Filter by complete
      </button>
      {filterTodos(todos).map((todo, index) => (
        <Todo
          key={todo.id}
          id={todo.id}
          text={todo.text}
          status={todo.status}
        />
      ))}
    </div>
  );
}
