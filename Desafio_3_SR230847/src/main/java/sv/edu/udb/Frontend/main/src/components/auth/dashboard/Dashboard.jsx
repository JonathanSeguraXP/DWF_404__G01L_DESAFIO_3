import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard">
            <h1>Dashboard - NovaTech Solutions</h1>

            <div className="welcome-section">
                <h2>Bienvenido, {user?.firstName} {user?.lastName}!</h2>
                <p>Rol: <strong>{user?.role}</strong></p>
                <p>Email: {user?.email}</p>
            </div>

            <div className="dashboard-cards">
                <div className="card">
                    <h3>Usuarios</h3>
                    <p>Gestiona los usuarios del sistema</p>
                    <a href="/users" className="card-link">Ir a Usuarios</a>
                </div>

                <div className="card">
                    <h3>Proyectos</h3>
                    <p>Administra los proyectos de la empresa</p>
                    <a href="/projects" className="card-link">Ir a Proyectos</a>
                </div>

                <div className="card">
                    <h3>Estadísticas</h3>
                    <p>Visualiza métricas del sistema</p>
                    <button className="card-link" disabled>Próximamente</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;