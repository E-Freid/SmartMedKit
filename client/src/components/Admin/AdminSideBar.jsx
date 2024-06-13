import React from 'react';
import {Navbar, Nav, Offcanvas} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';

import '../../styles/sideBar.css';

const AdminSideBar = () => {
  return (
    <>
        <Navbar.Toggle aria-controls='offcanvasNavbar'/>
        <Navbar.Offcanvas
          id='offcanvasNavbar'
          className="sidebar"
          aria-labelledby='offcanvasNavbarLabel'
          placement='start'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='NavbarLabel'>Admin Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <NavLink to="/admin/kits" className="nav-link">My Kits</NavLink>
              <NavLink to="/admin/dashboard" className="nav-link">Dashboard</NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </>
  );
}

export default AdminSideBar;
