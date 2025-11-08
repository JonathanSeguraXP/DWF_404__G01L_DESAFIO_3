import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import ProjectManagement from './components/dashboard/ProjectManagement';
import UserManagement from './components/dashboard/UserManagement';
import ErrorBoundary from './components/common/ErrorBoundary';

function AppRoutes() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/projects" element={
                        <ProtectedRoute>
                            <ProjectManagement />
                        </ProtectedRoute>
                    } />
                    <Route path="/users" element={
                        <ProtectedRoute>
                            <UserManagement />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default AppRoutes;