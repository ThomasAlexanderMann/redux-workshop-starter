import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        todoAdded(state, action) {
            // Remember, state at this level is an array of todos!
            // The payload will be a new todo object
            state.push(action.payload)
        },
        deleteTodo(state, action) {
            // take an ID
            return state.filter(todo => todo.id !== action.payload)
        },
        updateStatus(state, action) {
            // payload should be an id and a new status
            const {id, status} = action.payload
            state.find(todo => todo.id === id).status = status
        }
   }
})

export default todosSlice.reducer

export const selectTodos = state => state.todos

export const {todoAdded, deleteTodo, updateStatus} = todosSlice.actions