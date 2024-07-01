import { createTodo, markComplete, changePriority, createProject } from './todo-app';
import { loadDisplay, createContent, createProjectDiv, addTodoButton } from './todo-DOM';

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
    event.preventDefault();
    newProjectDialog.close();
})

// Add todo to project using form handler
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
    })    
}

loadDisplay(projectList);
addTodo();

