document.assEventListener ('DOMContentLoaded' ,() => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load task from LocalStorage if available 
    loadTasks();
    //Add task when "add task" button is clicked
 addTaskButton.addEventListener('click', () =>
{
    const taskText = taskInput.ariaValueMax.trim();
    if (taskText !== '') {
        addTaskButton(taskText);
        taskInput.vlaue = ''; // Clear input field 

    }
});
//Function to add a new task to the list and localSTorage
function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
    <span class="task-text"> ${taskText}</span>
    <button class = "delete-btn">Delete</button>
    `;
    //Toggle task completion when clicked
    taskItem.addEventListener('click' , () => {
        taskItem.classList.toggle('completed');
        updateLocalStorage();
    });
    //Delete task when "Delete" button is clicked
    const deleteButton = taskItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click' ,(event) => {
        event.stopPropagagtion();
        taskItem.remove();
        updateLocalStorage();
    }) ;
    //Append the new task to task list 
    taskList.appendChild(taskItem);
    updateLocalStorage();

}
//Update task in localSTorage
function updateLocalStorage() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(item => {
        const taskText = item.querySelector('.task-text').textContent;
        const isCompleted = item.classList.contains('completed');
        tasks.push({ text:taskText,  completed:isCompleted  });
    });
    localStorage.setItem('tasks', JSON.stringify('tasks'));
    if(tasks) {
        tasks.forEach(task =>{
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
            <span class= "task-text" >${task.text} </span>
            <button class="delete-btn">Delete</button>`;
            if (task.completed ) {
                taskItem.classList.add('completed');
            }
            // Delete task when "Delete" button is clicked
            const deleteButton = taskItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click' ,(event) => {
        event.stopPropagagtion();
        taskItem.remove();
        updateLocalStorage();
    }) ;
    //Toggle task coompletion when clicked
    taskItem.addEventListener('click' , () => {
        taskItem.classList.toggle('completed');
        updateLocalStorage();
    });
    taskList.appendChild(taskItem);
        });
    }
}
});