const API_URL = 'http://localhost:9090/api';

function showMessage(text, type = 'error') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.style.color = type === 'error' ? 'red' : 'green';
    setTimeout(() => messageDiv.textContent = '', 3000);
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            document.getElementById('loginSection').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            document.getElementById('userName').textContent = data.username;
            showMessage('Login exitoso!', 'success');
        } else {
            showMessage(data || 'Error en login');
        }
    } catch (error) {
        showMessage('Error de conexión');
    }
}

async function loadUsers() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const users = await response.json();
            displayUsers(users);
            document.getElementById('usersSection').classList.remove('hidden');
        } else {
            showMessage('Error al cargar usuarios');
        }
    } catch (error) {
        showMessage('Error de conexión');
    }
}

function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = users.map(user => `
        <div class="user-card">
            <strong>${user.username}</strong> - ${user.email}
        </div>
    `).join('');
}

function logout() {
    localStorage.removeItem('token');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('usersSection').classList.add('hidden');
    showMessage('Sesión cerrada', 'success');
}

// Verificar si ya está logueado
window.onload = function() {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
    }
};