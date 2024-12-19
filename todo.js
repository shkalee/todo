// script.js
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');

function addTask() {
  const newTask = taskInput.value;
  const dueDate = dueDateInput.value;

  if (newTask !== '') {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" class="btn3" onchange="toggleComplete(event)">
      <span class="span" >${newTask}</span>
      <span class="due-date">${dueDate}</span>
      <button onclick="deleteTask(event)" class="btn2" >delete</button>
    `;

    listItem.dataset.dueDate = dueDate;
    taskList.appendChild(listItem);
    saveTasks();

    taskInput.value = '';
    dueDateInput.value = '';
  }
}

function deleteTask(event) {
  const taskItem = event.target.parentNode;
  taskList.removeChild(taskItem);
  saveTasks();
}

function toggleComplete(event) {
  const taskItem = event.target.parentNode;
  taskItem.classList.toggle('completed');
  saveTasks();
}

function sortTasks() {
  const tasks = Array.from(taskList.children);
  tasks.sort((a, b) => new Date(a.dataset.dueDate) - new Date(b.dataset.dueDate));
  taskList.append(...tasks);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(Array.from(taskList.children).map(task => {
    return {
      text: task.querySelector('span').textContent,
      dueDate: task.dataset.dueDate,
      completed: task.classList.contains('completed')
    };
  })));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input type="checkbox" class="btn"  ${task.completed ? 'checked' : ''}>
        <span class="text">${task.text}</span>
        <span class="due-date">${task.dueDate}</span>
        <button onclick="deleteTask(event)" class="btn2" >delete</button>
      `;
      listItem.dataset.dueDate = task.dueDate;
      listItem.classList.toggle('completed', task.completed);
      taskList.appendChild(listItem);
    });
  }
}

loadTasks();
