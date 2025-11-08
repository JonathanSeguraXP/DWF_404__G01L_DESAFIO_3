import React, { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import LoadingSpinner from '../common/LoadingSpinner';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const projectsData = await projectService.getAllProjects();
            setProjects(projectsData);
        } catch (error) {
            setError('Error al cargar proyectos: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="project-management">
            <h1>Gestión de Proyectos</h1>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Creado por</th>
                        <th>Fecha Creación</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>{project.createdBy}</td>
                            <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {projects.length === 0 && (
                <div className="no-data">
                    No hay proyectos registrados en el sistema.
                </div>
            )}
        </div>
    );
};

export default ProjectManagement;