document.getElementById("taskForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (task === "") return;

  addTaskToList(task);
  saveTasks();
  input.value = "";
});

document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("taskList").innerHTML = "";
  localStorage.removeItem("tasks");
});

function addTaskToList(taskText, isChecked = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;

  const span = document.createElement("span");
  span.textContent = taskText;

  if (isChecked) {
    span.style.textDecoration = "line-through";
    span.style.color = "gray";
  }

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "black";
    }
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
  const items = document.querySelectorAll("#taskList li");
  const tasks = [];

  items.forEach(item => {
    const checkbox = item.querySelector("input[type='checkbox']");
    const span = item.querySelector("span");

    tasks.push({
      text: span.textContent,
      checked: checkbox.checked
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.addEventListener("DOMContentLoaded", function () {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => {
    addTaskToList(task.text, task.checked);
  });
});

const quotes = [
  "“Education is the most powerful weapon which you can use to change the world.” — Nelson Mandela",
  "“Innovation distinguishes between a leader and a follower.” — Steve Jobs",
  "“Learning never exhausts the mind.” — Leonardo da Vinci",
  "“The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.” — Stephen Hawking",
  "“Never leave that till tomorrow which you can do today.” — Benjamin Franklin"
];

const randomIndex = Math.floor(Math.random() * quotes.length);
const quoteText = quotes[randomIndex];

document.getElementById("quote").innerHTML = '<marquee direction="left" scrollamount="4">' + quoteText + '</marquee>';

function updateCountdown() {
  const now = new Date();
  const end = new Date("December 31, 2025 23:59:59");
  const diff = end - now;

  if (diff < 0) {
    console.log("🎉 Happy New Year 2026!");
    return;
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const message = "⏳ Time left in 2025: " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";

  console.log(message);

  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    countdownElement.textContent = message;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

function showDate() {
  let today = new Date();
  let day = today.toLocaleString('default', { weekday: 'long' });
  let date = today.toLocaleDateString();
  document.getElementById("dateBox").textContent = "🗓️ " + day + ", " + date;
}

showDate();

