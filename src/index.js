import { createTodo, markComplete, changePriority, createProject } from './todo-app';
import { loadDisplay, createContent, createProjectDiv } from './todo-DOM';

const projectList = [];
const todoList = [];
const todo1 = createTodo('Insurance', 'aaaaaa', 'December', 'Medium');
const todo2 = createTodo('Cleaning', 'bbbbbb', 'January', 'Medium');
todoList.push(todo1, todo2);
const myProject = createProject('My Project', todoList);
projectList.push(myProject);


loadDisplay(projectList);