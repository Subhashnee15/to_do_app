// load task from localStorage
const loadTask = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
};
// Save Task to localStorage
const saveTask = () => {
    const tasks = [];
    document.querySelectorAll('.taskItem').forEach(taskItem => {
        const task = {
            text : taskItem.querySelector('.taskText').innerText,
            priority: taskItem.className.split('')[1],
            completed: taskItem.querySelector('.taskText').classList.contains('completed'),

        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
//create a task element 
const createTaskElement = (task) => {
    const taskList = document.getElementById('.taskList');
    const taskItem = document.createElement('li');
    taskItem.classList.add('taskItem',task.priority.toLowerCase());
}
