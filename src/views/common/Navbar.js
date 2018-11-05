import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Navbar as BootstrapNavbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const NavBar = ({ auth }) => (
  <BootstrapNavbar color="dark" dark expand>
    <NavbarBrand href="/">Reactibook</NavbarBrand>
    <Nav className="ml-auto" navbar>
      {auth.isEmpty
      ? <Fragment>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/register">Register</NavLink>
          </NavItem>
        </Fragment>

      : <Fragment>
          <NavItem>
            <NavLink href="/feed">Feed</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/logout">Logout ({auth.email})</NavLink>
          </NavItem>
        </Fragment>}
    </Nav>
  </BootstrapNavbar>
);

export default connect(state => ({
  auth: state.firebase.auth
}))(NavBar);