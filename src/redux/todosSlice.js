import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
const getTodosFromServer = createAsyncThunk(
  "todos/getTodosFromServer",
  async () => {
    const response = await fetch("http://localhost:3000");
    console.log(response);
    return response.data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      // Remember, state at this level is an array of todos!
      // The payload will be a new todo object
      state.push(action.payload);
      console.table(JSON.parse(JSON.stringify(state)));
    },
    deleteTodo(state, action) {
      // take an ID
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateStatus(state, action) {
      // payload should be an id and a new status
      const { id, status } = action.payload;
      state.find((todo) => todo.id === id).status = status;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getTodosFromServer.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("fulfilled");
    });
  },
});

export default todosSlice.reducer;

export const { todoAdded, deleteTodo, updateStatus } = todosSlice.actions;
