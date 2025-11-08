import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/dashboard">NovaTech Solutions</Link>
            </div>

            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Usuarios</Link>
                <Link to="/projects">Proyectos</Link>
            </div>

            <div className="nav-user">
                {user ? (
                    <div className="user-menu">
                        <span>Hola, {user.firstName}</span>
                        <span className="user-role">({user.role})</span>
                        <button onClick={handleLogout} className="logout-button">
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <Link to="/login">Iniciar Sesión</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;