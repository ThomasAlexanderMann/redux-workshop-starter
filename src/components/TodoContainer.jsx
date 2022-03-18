import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Todo from './Todo'


export default function TodoContainer() {
	const dispatch = useDispatch()
	// Selector to get the array of todos from state
	const todosList = useSelector(state => state.todos)
	const filterActive = useSelector(state => state.filter.filterActive)
	function toggleFilter() {
		dispatch({type: 'filter/toggleFilter'})
	}

	function filterTodos(todos) {
		if (filterActive) {
			return todos.filter(todo => todo.status === 'completed')
		}
		return todos
	}
	// Now we just map our todos and pass down the data for each todo.
	// We could optimise this further and just pass down IDs, then select data in each todo
	
  return (
	  <div className="todo-container">
		  <button onClick={toggleFilter} style={{width: "15rem", backgroundColor: 'rebeccapurple'}}>Filter by complete</button>
		  {filterTodos(todosList).map((todo, index) => <Todo key={index} todoData={todo}/>)}
		</div>
	);
}
