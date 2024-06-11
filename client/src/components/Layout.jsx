import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../styles/layout.css';

import AdminSideBar from "./Admin/AdminSideBar";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Navbar variant="dark" bg="dark" expand={false} style={{minHeight: 55}}>
        <Container fluid className="relative-container">
          {isAdminRoute && <AdminSideBar />}
          <Navbar.Brand className="position-absolute start-50 translate-middle-x">SmartMedKit</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="text-center mt-5">
        {children}
      </Container>
    </>
  );
};

export default Layout;