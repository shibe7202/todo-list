function loadDisplay(projectList) {
    projectList.forEach(targetProject => {
        createProjectDiv(targetProject);
        createHeader(targetProject);
        createContent(targetProject);
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
        const title = document.createElement("p")
        title.classList.add("title");
        title.textContent = todo.title;
        const dueDate = document.createElement("p");
        dueDate.classList.add('date');
        dueDate.textContent = todo.dueDate;
        const projectDiv = document.querySelector('.' + targetProject.id);
        projectDiv.appendChild(title);
        projectDiv.appendChild(dueDate);
    })
}

export { loadDisplay, createProjectDiv, createContent };