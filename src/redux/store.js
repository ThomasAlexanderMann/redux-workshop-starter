import { configureStore } from "@reduxjs/toolkit";
// import todosReducer
import todosReducer from '../redux/todosSlice'
import filterReducer from '../redux/filterSlice'

export default configureStore({
    reducer: {
        todos: todosReducer,
        filter: filterReducer
    }
})

