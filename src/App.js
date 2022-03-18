import logo from "./logo.svg";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import AddTodo from "./components/AddTodo";
import { useState } from "react";

function App() {
	const [todos, setTodos] = useState([]);

  function deleteTodo(index) {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
		setTodos(newTodos);
	}

  function addNewTodo(text) {
	  setTodos([...todos, { text, status: 'incomplete' }]);
  }
	function setTodoStatus(index, status) {
		const updatedTodos = [...todos]
		updatedTodos[index].status = status
		setTodos(updatedTodos)
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>Stuff to Do</h1>
			</header>
			<AddTodo addNewTodo={addNewTodo} />
			<TodoContainer deleteTodo={deleteTodo} setTodoStatus={setTodoStatus} todos={todos} />
		</div>
	);
}

export default App;
