import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import LoadingSpinner from '../common/LoadingSpinner';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const usersData = await userService.getAllUsers();
            setUsers(usersData);
        } catch (error) {
            setError('Error al cargar usuarios: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="user-management">
            <h1>Gestión de Usuarios</h1>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="no-data">
                    No hay usuarios registrados en el sistema.
                </div>
            )}
        </div>
    );
};

export default UserManagement;