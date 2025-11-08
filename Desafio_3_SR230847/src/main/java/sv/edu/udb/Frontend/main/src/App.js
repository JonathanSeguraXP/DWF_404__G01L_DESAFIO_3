class NovaTechApp {
    constructor() {
        this.token = localStorage.getItem('jwtToken');
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuth();
    }

    bindEvents() {
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
        document.getElementById('load-users-btn').addEventListener('click', () => this.loadUsers());
    }

    checkAuth() {
        if (this.token) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    async handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                localStorage.setItem('jwtToken', this.token);
                this.showDashboard();
                this.showMessage('Login exitoso!', 'success');
            } else {
                this.showMessage(data || 'Error en credenciales', 'error');
            }
        } catch (error) {
            this.showMessage('Error de conexión', 'error');
        }
    }

    handleLogout() {
        this.token = null;
        localStorage.removeItem('jwtToken');
        this.showLogin();
        this.showMessage('Sesión cerrada', 'success');
    }

    async loadUsers() {
        try {
            const response = await fetch('http://localhost:8080/api/users', {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const users = await response.json();
                this.displayUsers(users);
                document.getElementById('users-section').classList.remove('hidden');
            } else {
                this.showMessage('Error al cargar usuarios', 'error');
            }
        } catch (error) {
            this.showMessage('Error de conexión', 'error');
        }
    }

    displayUsers(users) {
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = users.map(user => `
            <div class="user-card">
                <strong>${user.username}</strong> - ${user.email}
            </div>
        `).join('');
    }

    showDashboard() {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('users-section').classList.add('hidden');
    }

    showLogin() {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('login-form').reset();
    }

    showMessage(message, type) {
        const messageDiv = document.getElementById('login-message');
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 3000);
    }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new NovaTechApp();
});