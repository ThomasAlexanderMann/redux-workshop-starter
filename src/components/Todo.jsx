import React from 'react'

export default function Todo({ text, index, deleteTodo, status, setTodoStatus }) {
  return (
      <div className='todo'>
          <div className='text-cont'>
            <p>{text}</p>
          </div>
      <button onClick={() => deleteTodo(index)} className='delete'>Delete</button>
      <select value={status} onChange={e => setTodoStatus(index, e.target.value)}>
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </select>
      </div>
  )
}
