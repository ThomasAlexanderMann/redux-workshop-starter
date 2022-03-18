import React from 'react'
// Imported useDispatch
import { useDispatch } from 'react-redux'

export default function Todo({ todoData }) {
  const dispatch = useDispatch()
  // Delete a todo by its ID
  function deleteTodo() {
    dispatch({ type: "todos/todoDeleted", payload: todoData.id});
  }

  function setTodoStatus(newStatus) {
    dispatch({
      type: "todos/todoStatusChanged",
      payload: {
        id: todoData.id,
        status: newStatus
      }
    });
  }
  
  return (
      <div className='todo'>
          <div className='text-cont'>
            <p>{todoData.text}</p>
          </div>
      <button onClick={() => deleteTodo()} className='delete'>Delete</button>
      <select value={todoData.status} onChange={e => setTodoStatus(e.target.value)}>
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </select>
      </div>
  )
}
