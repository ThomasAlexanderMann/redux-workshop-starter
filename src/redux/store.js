import { createStore, combineReducers } from "redux";

// import the reducers we've made
import todosReducer from "./todosReducer";
import filterReducer from "./filterReducer";

// Combining the todosReducer and filterReducer:
const rootReducer = combineReducers({
	// Define a top-level state field named `todos`, handled by `todosReducer`
	todos: todosReducer,
	filter: filterReducer,
});

// Using the rootReducer to create the store:
const store = createStore(rootReducer);

export default store;
