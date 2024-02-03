import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { marginBottom: '10px' };

  return (
    <Navbar bg="light" expand="lg" style={menuStyle}>
      <Container>
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/"><h1>VolunTree</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto justify-content-end">
            {!currentUser && (
              <>
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_EVENT} as={NavLink} to="/aboutus">About Us</Nav.Link>
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_EVENT} as={NavLink} to="/eventopportunities">Events</Nav.Link>
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_EVENT} as={NavLink} to="/communitygroups">Community Groups</Nav.Link>

                <NavDropdown id="login-dropdown" title="Help">
                  <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/questions" />
                  <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/contactus">
                    Contact Us
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {currentUser ? ([ // Show these items only when user is logged in
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_EVENT} as={NavLink} to="/aboutus">About Us</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_EVENT} as={NavLink} to="/eventopportunities">Events</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_EVENT} as={NavLink} to="/communitygroups">Community Groups</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_EVENT} as={NavLink} to="/myaccount" key="list">My Account</Nav.Link>,
              <NavDropdown id="login-dropdown" title="Help">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/questions">
                  FAQ
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/contactus">
                  Contact Us
                </NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
            {/* eslint-disable-next-line no-undef */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database"><CloudDownload /> Database</NavDropdown.Item>
                </NavDropdown>]
            ) : ''}
          </Nav>
          <Nav className="ms-auto">
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin"><PersonFill />Sign in</NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"><PersonPlusFill />Sign up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) && (
                  <NavDropdown.Item as={NavLink} to="/vms">Manage Organizations</NavDropdown.Item>
                )}
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
