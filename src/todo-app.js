function createTodo(title, description, dueDate, priority) {
    let complete = false;
    const id = title.replace(/\s/g, "")
    return { title, description, dueDate, priority, complete, id };
};

function markComplete(todo) {
    todo.complete = true;
}

function changePriority(todo, priority) {
    todo.priority = priority;
}

function createProject(name, todoList = []) {
    const id = name.replace(/\s/g, "")
    return {name, todoList, id};
}

export { createTodo, markComplete, changePriority, createProject }