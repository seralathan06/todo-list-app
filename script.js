window.onload = function() {
  loadTasks();
};

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  loadTasks();
}

function loadTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
