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
