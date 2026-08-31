import { loadStudents } from './storage.js';
import { addStudent, deleteStudent } from './students.js';
import { login, logout } from './auth.js';

let students = [];

function $(id) {
    return document.getElementById(id);
}

function renderStudents() {
    const tbody = $('studentTable');
    tbody.innerHTML = '';

    students.forEach(student => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>
                <button class="deleteBtn"
                        data-id="${student.id}">
                    Delete
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function handleLogin() {
    const username = $('username').value.trim();
    const password = $('password').value.trim();

    if (login(username, password)) {
        $('loginPage').style.display = 'none';
        $('dashboard').style.display = 'block';
        $('msg').textContent = '';

        renderStudents();
    } else {
        $('msg').textContent = 'Invalid Username or Password';
    }
}

function handleLogout() {
    logout();

    $('dashboard').style.display = 'none';
    $('loginPage').style.display = 'block';

    $('username').value = '';
    $('password').value = '';
    $('msg').textContent = '';
}

function handleAddStudent() {
    const name = $('name').value.trim();
    const roll = $('roll').value.trim();
    const course = $('course').value.trim();

    students = addStudent(students, name, roll, course);

    renderStudents();

    $('name').value = '';
    $('roll').value = '';
    $('course').value = '';
}

function handleDeleteStudent(id) {
    students = deleteStudent(students, id);
    renderStudents();
}

document.addEventListener('DOMContentLoaded', () => {
    students = loadStudents();

    $('loginBtn').addEventListener('click', handleLogin);
    $('logoutBtn').addEventListener('click', handleLogout);
    $('addBtn').addEventListener('click', handleAddStudent);

    $('studentTable').addEventListener('click', event => {
        if (event.target.classList.contains('deleteBtn')) {
            const id = event.target.dataset.id;
            handleDeleteStudent(id);
        }
    });

    renderStudents();
});