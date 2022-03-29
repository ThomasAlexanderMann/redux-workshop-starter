import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: { allTodos: [] },
  reducers: {
    addTodo: (state, action) => {
      // add Todo to Todo array
      const newTodo = action.payload;
      newTodo.status = "incomplete";
      state.allTodos.push(newTodo);
    },
    deleteTodo: (state, action) => {
      const index = state.allTodos.findIndex(
        (element) => element.id === action.payload.id
      );
      state.allTodos.splice(index, 1);
    },
    updateTodo: (state, action) => {
      const index = state.allTodos.findIndex(
        (element) => element.id === action.payload.id
      );
      console.log(index);
      state.allTodos[index].status = action.payload.status;
    },
  },
});

// export action creators
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
