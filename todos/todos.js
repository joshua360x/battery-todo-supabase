import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    // on submit, create a todo, reset the form, and display the todos
    const data = new FormData(todoForm);
    const toDoInput = data.get('todo');
    await createTodo(toDoInput);
    displayTodos();
});


async function displayTodos() {
    // fetch the todos
    const toDoData = await getTodos();
    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: todos.js ~ line 30 ~ displayTodos ~ toDoData', toDoData);

    todosEl.textContent = '';
    toDoData.forEach(eachToDo => {
    //    console.log(eachToDo.todo)
    // const toDoItem = document.createElement('p')
    // toDoItem.textContent = eachToDo.todo;

    
    
        const newToDo = renderTodo(eachToDo);
    
        newToDo.addEventListener('click', async() => {
            await completeTodo(eachToDo.id);
            displayTodos();
        });


        todosEl.append(newToDo);
    });
    // display the list of todos
    // be sure to give each todo an event listener
    
    // on click, complete that todo


    // for (const eachToDo of toDoData.todo) {
    //     console.log(eachToDo);
    // }
}

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', () => {
    displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async() => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    displayTodos();
});


