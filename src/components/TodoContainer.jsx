import React from 'react'
import Todo from './Todo'

import { selectTodos } from '../redux/todosSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectFilterStatus, toggleFilter } from '../redux/filterSlice'

export default function TodoContainer() {
	const dispatch = useDispatch()
	const filterActive = useSelector(selectFilterStatus)
	const todosFromStore = useSelector(selectTodos)
	
	
	function filterTodos(todos) {
		if (filterActive) {
			return todos.filter(todo => todo.status === 'completed')
		}
		return todos
	}
  return (
	  <div className="todo-container">
		  <button onClick={() => dispatch(toggleFilter())} style={{width: "15rem", backgroundColor: 'rebeccapurple'}}>Filter by complete</button>
          {filterTodos(todosFromStore).map((todo, index) => <Todo key={index} todoData={todo} />)}
		</div>
	);
}
