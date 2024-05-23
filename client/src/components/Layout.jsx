import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar variant="dark" bg="dark">
        <Container fluid>
          <div className="d-flex justify-content-center w-100">
            <Navbar.Brand>SmartMedKit</Navbar.Brand>
          </div>
        </Container>
      </Navbar>
      <Container>
        {children}
      </Container>
    </>
  );
};

export default Layout;