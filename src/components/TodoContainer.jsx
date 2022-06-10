import React, { useEffect } from "react";
import Todo from "./Todo";

import { getTodos } from "../redux/todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectFilterStatus, toggleFilter } from "../redux/filterSlice";

export default function TodoContainer() {
  const dispatch = useDispatch();
  const filterActive = useSelector(selectFilterStatus);

  /* ---- Get the todos ---- */
  // look in state for the todos in the redux store
  const todosFromStore = useSelector((state) => state.todos);
  useEffect(() => {
    // send a dispatch that sends the API request and populates the todos in redux store when the data comes back fulfilled
    dispatch(getTodos());
  }, []);

  function filterTodos(todos) {
    if (filterActive) {
      return todos.filter((todo) => todo.status === "completed");
    }
    return todos;
  }
  return (
    <div className="todo-container">
      <button
        onClick={() => dispatch(toggleFilter())}
        style={{ width: "15rem", backgroundColor: "rebeccapurple" }}
      >
        Filter by complete
      </button>
      {filterTodos(todosFromStore).map((todo, index) => (
        <Todo key={index} todoData={todo} />
      ))}
    </div>
  );
}
