import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* ---- Get the Array of Todos from the server ---- */
export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  return fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
});

/* ---- add todo to the server ---- */
export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  return newTodo;
});

/* ---- delete todo from the server ---- */
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoID) => {
    await fetch(`http://localhost:3000/todos/${todoID}`, {
      method: "DELETE",
    });
    return todoID;
  }
);

/* ---- update todo complete status on the server ---- */
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, status }) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    });
    return { id, status };
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        // in this slice state is always just the todo array
        // replace the current todo array with new todo array from the server
        const todoArrayFromServer = [...action.payload];
        return todoArrayFromServer;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        // add the new Todo to the todo array
        state.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const deleteID = action.payload;
        // filter out the todo that has been deleted on the server
        const updatedState = state.filter((todo) => todo.id !== deleteID);
        return updatedState;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        // find the todo with the id and assign new status
        state.find((todo) => {
          return todo.id === id;
        }).status = status;
      });
  },
});

export default todosSlice.reducer;

export const { todoAdded, updateStatus } = todosSlice.actions;
