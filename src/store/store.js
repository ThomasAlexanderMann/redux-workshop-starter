export const store = {
    todos: []
}

/*
Store the todo objects like this:
{
    id: 12345, 
    text: "hello, this is a todo"
}
*/

export function addTodoToStore(todo) {
    store.todos.push(todo)
}

export function removeTodoFromStore(id) {
    const newTodos = store.todos.filter(todo => todo.id !== id)
    store.todos = newTodos
}

export function selectTodos() {
    return store.todos
}