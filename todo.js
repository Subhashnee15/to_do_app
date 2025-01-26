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
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.classList.add('taskItem',task.priority.toLowerCase());
    const taskText = document.createElement('span');
    taskText.classList.add('taskText');
    if(task.completed) {
        taskText.classList.add('completed');
    }
    taskText.innerText = task.text;
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () =>
    {
        taskItem.remove();
        saveTask();
    };
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
};
// Add  a new task 
document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskText = taskInput.value;
    const priority = prioritySelect.value;

    if (taskText.trim() !== '') {
        createTaskElement({ text : taskText,priority,completed : false});
        taskInput.value = '';
        saveTask();
    }
});
//sort task by priority
document.getElementById('sortButton').addEventListener('click', () => {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children);
    tasks.sort((a,b) => {
        const priorityOrder = {Low : 1, Medium : 2, High: 3};
        const priorityA = a.classList[1];
        const priorityB = b.classList[1];
        return priorityOrder[priorityA] - priorityOrder[priorityB];
    });
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));

});
// Load existing task on page load 
loadTask();