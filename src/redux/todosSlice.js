import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 } from 'uuid'

export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
    const response = await fetch("http://localhost:3000/todos");
    const todos = await response.json()
    console.log(todos)
    return todos
})

export const deleteTodo = createAsyncThunk('todos/deleteTodos', async (id) => {
    const response = await fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' });
    return id
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, status }) => {
    const reqBody = JSON.stringify({"status": status})
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
    },
        body: reqBody,
    })
    return {id, status}
})

export const addTodo = createAsyncThunk('todos/addTodo', async ({id, text, status}) => {
    const reqBody = JSON.stringify({id: id, text: text, status: status })
    const response = await fetch("http://localhost:3000/todos/", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: reqBody
    });
    console.log(response)
    return { id, text: text, status };
})





const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        todoAdded(state, action) {
            // Remember, state at this level is an array of todos!
            // The payload will be a new todo object
            state.push(action.payload)
        },

        updateStatus(state, action) {
            // payload should be an id and a new status
            const {id, status} = action.payload
            state.find(todo => todo.id === id).status = status
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadTodos.fulfilled, (state, action) => {
           
            return action.payload
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                console.log(action)
                const newState = state.filter(todo => todo.id !== action.payload)
                return newState
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const {id, status} = action.payload
            state.find(todo => todo.id === id).status = status
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                console.log(action)
                state.push(action.payload)
                
        })
    }
})

export default todosSlice.reducer

export const selectTodos = state => state.todos
