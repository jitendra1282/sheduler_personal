// Data
const tasks = [
    { title: "Team Standup", time: "09:00", category: "work", completed: true },
    { title: "Design Review", time: "11:30", category: "work", completed: false },
    { title: "Lunch with Sarah", time: "13:00", category: "personal", completed: false },
    { title: "Gym Session", time: "17:30", category: "health", completed: false },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// DOM Elements
const calendarStrip = document.getElementById('calendarStrip');
const taskList = document.getElementById('taskList');
const modalOverlay = document.getElementById('modalOverlay');
const fabAdd = document.getElementById('fabAdd');
const btnClose = document.getElementById('btnClose');
const btnCancel = document.getElementById('btnCancel');
const form = document.getElementById('addTaskForm');

// Initialization
function init() {
    renderCalendar();
    renderTasks();
    setupEventListeners();
}

// Render Calendar Strip
function renderCalendar() {
    const today = new Date();
    let html = '';

    // Generate next 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayName = days[date.getDay()];
        const dayNum = date.getDate();
        const isActive = i === 0 ? 'active' : '';

        html += `
            <div class="date-card ${isActive}">
                <span class="date-day">${dayName}</span>
                <span class="date-num">${dayNum}</span>
            </div>
        `;
    }
    calendarStrip.innerHTML = html;
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = tasks.map((task, index) => `
        <div class="task-card" onclick="toggleTask(${index})">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                ${task.completed ? '<span style="color:white; font-size:14px;">✓</span>' : ''}
            </div>
            <div class="task-content">
                <div class="task-time">${task.time}</div>
                <h3 class="task-title" style="${task.completed ? 'text-decoration: line-through; opacity: 0.5' : ''}">${task.title}</h3>
                <div class="task-tags">
                    <span class="tag tag-${task.category}">${task.category}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle Task Completion
window.toggleTask = function (index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

// Event Listeners
function setupEventListeners() {
    // Modal
    const openModal = () => {
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeModal = () => {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    fabAdd.addEventListener('click', openModal);
    btnClose.addEventListener('click', closeModal);
    btnCancel.addEventListener('click', closeModal);

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.querySelector('input[type="text"]').value;
        const time = form.querySelector('input[type="time"]').value;
        const category = form.querySelector('select').value;

        tasks.push({ title, time, category, completed: false });
        // Sort by time
        tasks.sort((a, b) => a.time.localeCompare(b.time));

        renderTasks();
        closeModal();
        form.reset();
    });

    // Close on outside click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// Run
init();
