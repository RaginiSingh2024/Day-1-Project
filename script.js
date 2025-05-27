// DOM Access
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const showPopupBtn = document.getElementById('showPopupBtn');
const popup = document.getElementById('popup');
const taskCount = document.getElementById('taskCount');

let taskCounter = 0;

function updateTaskCount() {
  taskCount.textContent = `Total Tasks: ${taskCounter}`;
}

// Add Task
taskForm.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent form reload

  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="deleteBtn">❌</button>
  `;

  taskList.appendChild(li);
  taskInput.value = '';
  taskCounter++;
  updateTaskCount();
});

// Event Delegation
taskList.addEventListener('click', function (e) {
  console.log('Target:', e.target);
  console.log('CurrentTarget:', e.currentTarget);

  if (e.target.classList.contains('deleteBtn')) {
    e.stopPropagation(); // stop event bubbling
    e.target.parentElement.remove();
    taskCounter--;
    updateTaskCount();
  } else if (e.target.tagName === 'SPAN') {
    e.target.classList.toggle('done'); // toggle done
  }
});

// Custom Event
const showWelcome = new Event('showWelcome');

showPopupBtn.addEventListener('click', function () {
  popup.dispatchEvent(showWelcome);
});

// Show custom popup
popup.addEventListener('showWelcome', function () {
  popup.classList.remove('hidden');

  // Remove listener after 3 sec (demo of removeEventListener)
  const hide = () => {
    popup.classList.add('hidden');
    popup.removeEventListener('showWelcome', hide);
  };

  setTimeout(hide, 3000);
});

// Add "Enter" key support for input
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('addBtn').click();
  }
});
