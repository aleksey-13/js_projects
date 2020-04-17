// Define UI Vars
const form = document.querySelector("#task-form"); // submit
const taskList = document.querySelector(".collection"); //
const clearBrn = document.querySelector(".clear-tasks"); // onclick
const filter = document.querySelector("#filter"); // onchange
const taskInput = document.querySelector("#task"); // onchange

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //DOM Load event
  document.addEventListener("DOMContentLoaded", renderTasks);

  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear tasks event
  clearBrn.addEventListener("click", clearTasks);

  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Render li element
function renderLiElement(task) {
  // Create li element
  const li = document.createElement("li");
  li.className = "collection-item";

  // Create text node and append to li
  li.appendChild(document.createTextNode(task));

  // Create link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.href = "#";
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);
}

// Add task
function addTask(e) {
  if (taskInput.value.trim() === "") {
    alert("Add a task");
  } else {
    renderLiElement(taskInput.value);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear the input field
    taskInput.value = "";
  }

  e.preventDefault();
}

// Store in LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks !== null && tasks.length > 0) {
    const newTasks = tasks.filter(
      (task) => task !== taskItem.firstChild.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove task from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Clear tasks
function clearTasks() {
  // taskList.innerHTML = ''

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear task from LS
function clearTasksFromLocalStorage() {
  localStorage.removeItem("tasks");
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Render tasks from LS
function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks !== null && tasks.length > 0) {
    tasks.forEach((task) => renderLiElement(task));
  }
}
