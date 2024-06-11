import React from 'react';
import {Navbar, Nav, Offcanvas} from 'react-bootstrap'
import {NavLink} from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <>
        <Navbar.Toggle aria-controls='offcanvasNavbar'/>
        <Navbar.Offcanvas
          id='offcanvasNavbar'
          aria-labelledby='offcanvasNavbarLabel'
          placement='start'
          variant='dark'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='NavbarLabel'>Admin Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <NavLink to="/admin/about">My Kits</NavLink>
              <NavLink to="/admin/about">Add A Kit</NavLink>
              <NavLink to="/admin/work">Dashboard</NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </>
  );
}

export default AdminSideBar;
