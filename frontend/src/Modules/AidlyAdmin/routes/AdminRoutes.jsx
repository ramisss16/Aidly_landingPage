import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DetailPage from '../pages/DetailPage';
import DeleteSuccess from '../pages/DeleteSuccess';
import AdminPasswordRecovery from '../../../pages/Common/AdminPasswordRecovery';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="forgot-password" element={<AdminPasswordRecovery />} />
      <Route path="reset-password" element={<AdminPasswordRecovery />} />

      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="entities/:type"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="entities/:type/:id"
        element={
          <ProtectedRoute>
            <DetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="success"
        element={
          <ProtectedRoute>
            <DeleteSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={<Navigate to="/admin/dashboard" replace />}
      />
    </Routes>
  );
};

export default AdminRoutes;