function loadDisplay(projectList) {
    const projects = document.querySelector('div#projects');
    projects.innerHTML = '';
    projectList.forEach(targetProject => {
        createProjectDiv(targetProject);
        createHeader(targetProject);
        createContent(targetProject);
        addTodoButton(targetProject);
    });
}

function createProjectDiv(targetProject) {
    const div = document.createElement('div');
    div.classList.add(targetProject.id);
    const projectsDiv = document.querySelector('#projects');
    projectsDiv.appendChild(div);
}

function createHeader(targetProject) {
    const projectDiv = document.querySelector('.' + targetProject.id);
    const header = document.createElement('h1');
    header.textContent = targetProject.name;
    header.classList.add('project-header');
    projectDiv.appendChild(header);
}

function createContent(targetProject) {
    targetProject.todoList.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.setAttribute('id', todo.id);
        todoDiv.classList.add('todo-div')
        const title = document.createElement("p")
        title.classList.add("title");
        title.textContent = todo.title;
        const dueDate = document.createElement("p");
        dueDate.classList.add('date');
        dueDate.textContent = todo.dueDate;
        todoDiv.appendChild(title);
        todoDiv.appendChild(dueDate);
        const projectDiv = document.querySelector('.' + targetProject.id);
        projectDiv.appendChild(todoDiv);
    })
}

function expandTodoDOM(todoDiv, todo) {
    const description = document.createElement('p');
    description.classList.add('expand-todo');
    description.innerText = 'Description: ' + todo.description;
    todoDiv.appendChild(description);
    const priority = document.createElement('p');
    priority.classList.add('expand-todo');
    priority.innerText = 'Priority: ' + todo.priority;
    todoDiv.appendChild(priority);
    const edit = document.createElement('button');
    edit.classList.add('edit-todo');
    edit.setAttribute('id', 'edit-' + todo.id);
    edit.innerText = 'Edit';
    todoDiv.appendChild(edit);
    const erase = document.createElement('button');
    erase.setAttribute('id', 'erase-' + todo.id);
    erase.innerText = 'Erase';
    todoDiv.appendChild(erase);

}

function addTodoButton(targetProject) {
    const todo = document.createElement('p');
    todo.classList.add('create-todo');
    todo.setAttribute("id", targetProject.id);
    todo.textContent = '+ Add Task';
    const projectDiv = document.querySelector('.' + targetProject.id);
    projectDiv.appendChild(todo);
}

export { loadDisplay, createProjectDiv, createContent, addTodoButton, expandTodoDOM };