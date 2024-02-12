import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  const { currentUser, isAdmin } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    isAdmin: Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]),
  }), []);

  return (
    <Navbar expand="md" style={{ marginBottom: '10px', backgroundColor: '#02B5A6' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" id={COMPONENT_IDS.NAVBAR_LANDING_PAGE}><img src="/images/Voluntree.logo-noG.png" alt="VolunTree" width="160" height="112" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" id={COMPONENT_IDS.NAVBAR_HOME}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/aboutus" id={COMPONENT_IDS.NAVBAR_ABOUT_US}>About Us</Nav.Link>
            <Nav.Link as={NavLink} to="/eventopportunities" id={COMPONENT_IDS.NAVBAR_LIST_EVENT}>Events</Nav.Link>
            <Nav.Link as={NavLink} to="/communitygroups" id={COMPONENT_IDS.NAVBAR_COMMUNITY_GROUPS}>Community Groups</Nav.Link>
            <Nav.Link as={NavLink} to="/faq" id={COMPONENT_IDS.NAVBAR_FAQ}>FAQ</Nav.Link>
            {isAdmin && (
              <>
                <Nav.Link as={NavLink} to="/admin" id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN}>Admin</Nav.Link>
                <NavDropdown title="Manage" id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN}>
                  <NavDropdown.Item as={NavLink} to="/manage-database" id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE}>Database <CloudDownload /></NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <NavDropdown title={currentUser} id={COMPONENT_IDS.NAVBAR_CURRENT_USER}>
                <NavDropdown.Item as={NavLink} to="/signout" id={COMPONENT_IDS.NAVBAR_SIGN_OUT}><BoxArrowRight /> Sign out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Login" id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}>
                <NavDropdown.Item as={NavLink} to="/signin" id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN}><PersonFill /> Sign in</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/signup" id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP}><PersonPlusFill /> Sign up</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
