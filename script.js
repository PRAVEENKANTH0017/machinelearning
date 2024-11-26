// DOM elements
const taskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listener for adding a new task
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create new task element
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Add 'Complete' and 'Delete' buttons
    const completeButton = document.createElement('button');
    completeButton.textContent = '✔';
    completeButton.addEventListener('click', toggleComplete);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', deleteTask);

    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    // Add task item to the list
    taskList.appendChild(taskItem);

    // Save task to localStorage
    saveTask(taskText);

    // Clear input field
    taskInput.value = '';
}

function toggleComplete(e) {
    const taskItem = e.target.parentElement;
    taskItem.classList.toggle('completed');

    // Update task in localStorage
    updateLocalStorage();
}

function deleteTask(e) {
    const taskItem = e.target.parentElement;
    taskItem.remove();

    // Update localStorage
    updateLocalStorage();
}

function saveTask(taskText) {
    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = '✔';
        completeButton.addEventListener('click', toggleComplete);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', deleteTask);

        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

function updateLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('li');

    taskItems.forEach(taskItem => {
        const taskText = taskItem.textContent.replace('✔❌', '').trim();
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
