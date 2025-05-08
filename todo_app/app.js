let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const deleteAllBtn = document.getElementById("delete-all");
const tabs = document.querySelectorAll(".tabs button");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  const filtered = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    };

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
};

deleteAllBtn.onclick = () => {
  tasks = [];
  saveTasks();
  renderTasks();
};

tabs.forEach(tab => {
  tab.onclick = () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.tab;
    renderTasks();
  };
});

renderTasks();
