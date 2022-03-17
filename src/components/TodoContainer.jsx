import React, {useEffect} from 'react'
import Todo from './Todo'
export default function TodoContainer({todos, deleteTodo}) {
    
  return (
		<div className="todo-container">
          {todos.map((todo, index) => <Todo key={index} index={index} text={todo} deleteTodo={deleteTodo} />)}
		</div>
	);
}
