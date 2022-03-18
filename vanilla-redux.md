# Adding vanilla redux to the application
(From the Redux docs)
https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow

## Key concepts:
### immutability:
    The redux store should not be modified directly. We should make immutable changes to it:
    For example, we could do the following to an object (a mutating change):
    ```
    const obj = {
        a: 1,
        b: 2
    }

    // mutating change to the object:
    obj.c = 3

    const array = [1, 2]
    // mutating change to the array:
    array.push(3)
    ```
    
    *** Instead, in Redux, we must make copies of the original array or object, then modify the copy ***
    ```
    const obj = {
        a: 1,
        b:2
    }
    const newObj = {
        ...obj, // copy the original object
        c: 3
    }

    const array = [1, 2]

    const newArray = [...array, 3]
    // or
    const otherNewArray = array.concat(3)
    ```

    ### Actions:
    Actions are JS object that have a `type` field. This describes something that has happened in the application.
    Actions can also have a `payload` field, which describes data.
    ```
    const todoAction = {
        type: 'todos/todoAdded',
        payload: 'feed the dog'
    }
    ```

    ### Reducers
    Reducers receive the current `state` of the app, and an `action` object. They decide how to update the state.
    They follow this pattern: `(state, action) => newState`.
    *** Key rules for reducers **(
        - They only calculate new state based on the `state` and `action` arguments.
        - They cannot modify the existing `state`. Instead they make immutable updates by copying the existing state, modifying the copy, then returning it.
        - They cannot do any async logic, calculate random values, or have other side effects

    #### Example of a reducer:

    ```

    function todoReducer(state, action) {
        if(action.type === 'todos/addTodo') {
            // If the action type is to add a todo, return new state with the todo added:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload
                ]
            }
        }
        // otherwise, just return the previous state:
        return state
    }
    ```
    Store​
The current Redux application state lives in an object called the store .

The store is created by passing in a reducer, and has a method called getState that returns the current state value:

```
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}
```
### Dispatch:
The Redux store has a method called dispatch. The only way to update the state is to call store.dispatch() and pass in an action object. The store will run its reducer function and save the new state value inside, and we can call getState() to retrieve the updated value:
```
store.dispatch({ type: 'counter/incremented' })

console.log(store.getState())
// {value: 1}
```

### Selectors:
Selectors​
Selectors are functions that know how to extract specific pieces of information from a store state value. As an application grows bigger, this can help avoid repeating logic as different parts of the app need to read the same data:

```
const selectTodos = state => state.todos

const allTodos = selectTodos(store.getState())
```

# Converting our app to Vanilla Redux
1. Decide on the actions we want to perform:
    - Add a note
    - Delete a note
    - Set completion status
    - Set filter status (really, this could be in component state)
2. Create reducers:
    - Create a `reducer.js` file inside `src`
    - Create an reducer function that includes a switch statement.
    The switch statement should check the action string, and perform the required updates to the state if it matches. (Remember to use immutable updates!). Create a `notesReducer` and `filterReducer`.
    - Install Redux, then use the `combineReducers` function to combine them into one `rootReducer`. Example below from Redux docs:

    ```
    // inside todosReducer.js:
    export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      // Can return just the new todos array - no extra object around it
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          completed: false
        }
      ]
    }
    case 'todos/todoToggled': {
      return state.map(todo => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed
        }
      })
    }
    default:
      return state
  }
}
    ```

    ```
    // Inside filterReducer.js:

    const initialState = {
  status: 'All',
  colors: []
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return {
        // Again, one less level of nesting to copy
        ...state,
        status: action.payload
      }
    }
    default:
      return state
  }
}
    ```
    ```
    // Inside reducer.js
    import { combineReducers } from 'redux'

    import todosReducer from './features/todos/todosSlice'
    import filtersReducer from './features/filters/filtersSlice'

    const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer
    })

    export default rootReducer
    ```
    // in store.js

    - Add these reducers to the store:
        import { createStore } from 'redux'
        import rootReducer from './reducer'

        const store = createStore(rootReducer)

        export default store
        ```
    - Now time to hook react up to it.
    Run `npm i react-redux`.
    Define some selectors to get data from the store. Run these using `useSelector()`
    `useSelector()` causes our component to re-render every time the data it references changes, keeping things up-to-date.
    ```
    import React from 'react'
    import { useSelector } from 'react-redux'
    import TodoListItem from './TodoListItem'

    const selectTodos = state => state.todos

    const TodoList = () => {
    const todos = useSelector(selectTodos)

    ```
    - Add dispatchers to update the redux store with new data:
    ```
    import React, { useState } from 'react'
    import { useDispatch } from 'react-redux'
    import uuid from 'uuid' // generates ids

const AddTodo = () => { 
    const [todoText, setTodoText] = useState("");
    const dispatch = useDispatch()
    function handleAddTodo() {
        const id = uuid.v4()
        dispatch({type: 'todos/addTodo', payload: {id: id, text: todoText}})
    }

    ```
    - Now use `Provider` to provide the app with our store (so our hooks work)
    ```
    import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

ReactDOM.render(
  // Render a `<Provider>` around the entire `<App>`,
  // and pass the Redux store to as a prop
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
    ```






