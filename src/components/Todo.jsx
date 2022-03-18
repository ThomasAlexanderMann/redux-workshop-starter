import React from 'react'
import { useDispatch } from 'react-redux'
import { updateTodo, deleteTodo } from '../redux/todosSlice'

export default function Todo({ todoData }) {
  const dispatch = useDispatch()
  const { id, text, status } = todoData
  return (
      <div className='todo'>
          <div className='text-cont'>
            <p>{todoData.text}</p>
          </div>
      <button onClick={() => dispatch(deleteTodo(id))} className='delete'>Delete</button>
      <select value={todoData.status} onChange={e => dispatch(updateTodo({id, status: e.target.value}))}>
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </select>
      </div>
  )
}
