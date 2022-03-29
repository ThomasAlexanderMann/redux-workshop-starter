import { configureStore } from "@reduxjs/toolkit";
import todoReducers from "./todos/todosSlice";

export default configureStore({
  reducer: { todos: todoReducers },
});
