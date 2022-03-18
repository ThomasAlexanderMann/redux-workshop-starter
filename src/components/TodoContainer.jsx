import React, {useState} from 'react'
import Todo from './Todo'
export default function TodoContainer({todos, deleteTodo, setTodoStatus}) {
	const [filter, setFilter] = useState(false)
	
	function filterTodos(todos) {
		if (filter) {
			return todos.filter(todo => todo.status === 'completed')
		}
		return todos
	}
  return (
	  <div className="todo-container">
		  <button onClick={() => setFilter(!filter)} style={{width: "15rem", backgroundColor: 'rebeccapurple'}}>Filter by complete</button>
          {filterTodos(todos).map((todo, index) => <Todo key={index} index={index} text={todo.text} status={todo.status} deleteTodo={deleteTodo} setTodoStatus={setTodoStatus} />)}
		</div>
	);
}
