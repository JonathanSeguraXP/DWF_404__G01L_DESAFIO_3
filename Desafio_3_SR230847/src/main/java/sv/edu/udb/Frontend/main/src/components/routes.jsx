import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import UserManagement from './components/dashboard/UserManagement';
import ProjectManagement from './components/dashboard/ProjectManagement';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Navbar />
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/users" element={
                <ProtectedRoute>
                    <Navbar />
                    <UserManagement />
                </ProtectedRoute>
            } />
            <Route path="/projects" element={
                <ProtectedRoute>
                    <Navbar />
                    <ProjectManagement />
                </ProtectedRoute>
            } />
            <Route path="/" element={
                <ProtectedRoute>
                    <Navbar />
                    <Dashboard />
                </ProtectedRoute>
            } />
        </Routes>
    );
};