import React from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { AuthProvider, useAuth } from '../../state/AuthContext';

import AdminLoginPage from '../../pages/Admin/Login';
import AddKitPage from "../../pages/Admin/AddKit";
import Dashboard from "../../pages/Admin/Dashboard";
import MyKits from "../../pages/Admin/MyKits";
import KitPage from "../../pages/Admin/KitPage";

const PrivateRoute = ({ component: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/admin/login" state={{ from: location }} />;
};

const AdminRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/admin" element={<PrivateRoute component={Dashboard} />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/kit/:kitId" element={<PrivateRoute component={KitPage} />} />
      <Route path="/admin/kits" element={<PrivateRoute component={MyKits} />} />
      <Route path="/admin/kits/add" element={<PrivateRoute component={AddKitPage} />} />
      <Route path="/admin/kits/add/:kitId" element={<PrivateRoute component={AddKitPage} />} />
      {/*<Route path="/admin/dashboard" element={<PrivateRoute component={Dashboard} />} />*/}
    </Routes>
  </AuthProvider>
);

export default AdminRoutes;
