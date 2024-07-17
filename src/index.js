import { createTodo, markComplete, changePriority, createProject, updateID } from './todo-app';
import { loadDisplay, createContent, createProjectDiv, addTodoButton, expandTodoDOM } from './todo-DOM';
import './style.css';

const projectList = [];
const todoList = [];

// Create sample project for webpage display
const todo1 = createTodo('Insurance', 'aaaaaa', 'December', 'Medium');
const todo2 = createTodo('Cleaning', 'bbbbbb', 'January', 'Medium');
todoList.push(todo1, todo2);
const myProject = createProject('My Project', todoList);
projectList.push(myProject);

// Make event listeners that create new project
const newProjectDialog = document.querySelector('#project-dialog');
const openDialog = document.querySelector('button.create-project');
const closeDialog = document.querySelector('#close-form');

openDialog.addEventListener('click', () => {
    newProjectDialog.showModal();
})

closeDialog.addEventListener('click', (event) => {
    const projectName = document.querySelector('input#name').value;
    const newProject = createProject(projectName);
    projectList.push(newProject);
    loadDisplay(projectList);
    addTodo();
    expandTodo();
    event.preventDefault();
    newProjectDialog.close();
})

// Add event listener to every 'Add Todo' Button. Process input with form.
function addTodo() {
    let todoButtonsList = document.querySelectorAll('.create-todo');
    todoButtonsList.forEach((button) => {
        button.addEventListener('click', () => {
            const parentProject = projectList.find((project) => project.id === button.id);
            todoFormHandler(parentProject);
        })
    })
}

function todoFormHandler(parentProject) {
    const todoDialog = document.querySelector('#todo-dialog');
    const form = document.querySelector('#todo-form');

    // Clone and replace closeDialog DOM node to remove its former event listener
    const oldDialog = document.querySelector('#close-todo-form');
    const closeDialog = oldDialog.cloneNode(true);
    oldDialog.parentNode.replaceChild(closeDialog, oldDialog);

    todoDialog.showModal();
    closeDialog.addEventListener('click', function todoForm(event) {
        const formData = new FormData(form);
        const newTodo = createTodo(formData.get('title'), formData.get('description'), formData.get('due-date'), formData.get('priority'));
        parentProject.todoList.push(newTodo);
        event.preventDefault();
        todoDialog.close();
        loadDisplay(projectList);
        addTodo();
        expandTodo()
    })    
}

// Add event listeners to expand todo and show all of its information.
function expandTodo() {
    let todoDivList = document.querySelectorAll('.todo-div');
    todoDivList.forEach((todoDiv) => {
        todoDiv.addEventListener('click', () => {
            projectList.forEach((project) => {
                let todo = project.todoList.find((todo) => todo.id === todoDiv.id);
                if (Boolean(todo)) {
                    expandTodoDOM(todoDiv, todo);
                    editTodo(todo);
                    eraseTodo(todo);
                }
            })
        }, { once: true })
    })
}

function editTodo(todo) {
    let editButton = document.querySelector('#edit-' + todo.id);
    editButton.addEventListener('click', () => {
        editFormHandler(todo);
    })
}

function editFormHandler(todo) {
    const todoDialog = document.querySelector('#todo-dialog');
    const form = document.querySelector('#todo-form');

    // Clone and replace closeDialog DOM node to remove its former event listener
    const oldDialog = document.querySelector('#close-todo-form');
    const closeDialog = oldDialog.cloneNode(true);
    oldDialog.parentNode.replaceChild(closeDialog, oldDialog);

    todoDialog.showModal();
    closeDialog.addEventListener('click', (event) => {
        const formData = new FormData(form);
        todo.title = formData.get('title');
        todo.description = formData.get('description');
        todo.dueDate = formData.get('due-date');
        todo.priority = formData.get('priority');
        updateID(todo);
        event.preventDefault();
        todoDialog.close();
        loadDisplay(projectList);
        addTodo();
        expandTodo()
    })    
}

function eraseTodo(todo) {
    let eraseButton = document.querySelector('#erase-' + todo.id);
    eraseButton.addEventListener('click', () => {
        projectList.forEach((project) => {
            const index = project.todoList.indexOf(todo);
            if (index >= 0) {
                project.todoList.splice(index, 1);
            }
        })
        loadDisplay(projectList);
        addTodo();
        expandTodo()
    })
}

loadDisplay(projectList);
addTodo();
expandTodo()

