function createTodo(title, description, dueDate, priority) {
    let complete = false;
    return { title, description, dueDate, priority, complete };
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