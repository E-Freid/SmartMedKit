import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../state/AuthContext';

import AdminLoginPage from '../../pages/Admin/Login';
import AdminHomePage from '../../pages/Admin/HomePage';
import Dashboard from "../../pages/Admin/Dashboard";

const PrivateRoute = ({ component: Element, location, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/admin/login" state={{ from: location }} />;
};

const AdminRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/admin" element={<PrivateRoute location="/admin" component={AdminHomePage} />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<PrivateRoute location="/admin/dashboard" component={Dashboard} />} />
    </Routes>
  </AuthProvider>
);

export default AdminRoutes;
