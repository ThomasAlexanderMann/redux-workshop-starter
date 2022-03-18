// Initial state for this slice - an empty array (to be filled with todos)
const initialState = []

export default function todosReducer(state = initialState, action) {
    console.log("State before action:", state)
    console.log(action)
    switch (action.type) {
        case 'todos/todoAdded':
            return [
                ...state,
                {
                    id: action.payload.id,
                    text: action.payload.text,
                    status: action.payload.status
                }
            ]
        
        case 'todos/todoStatusChanged':
            return state.map(todo => {
                if (todo.id !== action.payload.id) {
                    return todo
                }
                return {
                    ...todo,
                    status: action.payload.status
                }
            })
        case 'todos/todoDeleted':
            return [...state].filter(todo => {
                if (todo.id !== action.payload) {
                    return true
                }
                    return false
            })
        default:
            return state
    }
}
