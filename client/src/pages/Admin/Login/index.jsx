import React from 'react';
import { useAuth } from '../../../state/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import {Container} from "react-bootstrap";

const AdminLoginPage = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    const redirectTo = location.state?.from || '/admin';
    navigate(redirectTo);
  };

  return (
    <Container>
      <h2>Admin Login Page</h2>
      <button onClick={handleLogin}>Login as Admin</button>
    </Container>
  );
};

export default AdminLoginPage;
