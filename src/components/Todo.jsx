import React from 'react'

export default function Todo({text, index, deleteTodo}) {
  return (
      <div className='todo'>
          <div className='text-cont'>
            <p>{text}</p>
          </div>
          <button onClick={() => deleteTodo(index)} className='delete'>Delete</button>
      </div>
  )
}
