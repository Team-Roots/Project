import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import BeforeLanding from '../pages/BeforeLanding';
import Landing from '../pages/Landing';
import AddEvent from '../pages/AddEvent';
import EditEvent from '../pages/EditEvent';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import LoadingSpinner from '../components/LoadingSpinner';
import ManageDatabase from '../pages/ManageDatabase';
import ListEvent from '../pages/ListEvent';
import MyEvents from '../pages/MyEvents';
import Registration from '../pages/Registration';
import RegistrationForm from '../pages/RegistrationForm';
import MyAccount from '../pages/MyAccount';
import AboutUs from '../pages/AboutUs';
import OrgManagement from '../pages/organizations/OrgManagement';
import VolunteerEvents from '../pages/VolunteerEvents';
import FrequentlyAskedQuestions from '../pages/FrequentlyAskedQuestions';
import CommunityGroups from '../pages/CommunityGroups';
import SubscribedEvents from '../pages/SubscribedEvents';
import SearchOrganizations from '../pages/organizations/SearchOrganizations';
import ViewOrganization from '../pages/organizations/ViewOrganization';
import CalendarView from '../pages/Calendar_Page/Calendar';
import RegisterOrganization from '../pages/organizations/RegisterOrganization';
import ContactUs from '../pages/ContactUs';
import EditOrganization from '../pages/organizations/EditOrganization';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<BeforeLanding />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/faq" element={<FrequentlyAskedQuestions />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/dashboard" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><BeforeLanding /></ProtectedRoute>} />
          <Route path="/events/:_id" element={<ProtectedRoute><Registration /></ProtectedRoute>} />
          <Route path="/subscribedevents" element={<ProtectedRoute><SubscribedEvents /></ProtectedRoute>} />
          <Route path="/registrationform/:_id" element={<ProtectedRoute><RegistrationForm /></ProtectedRoute>} />
          <Route path="/event" element={<ProtectedRoute><ListEvent /></ProtectedRoute>} />
          <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
          <Route path="/myaccount" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
          <Route path="/eventopportunities" element={<VolunteerEvents />} />
          <Route path="/events" element={<ProtectedRoute><VolunteerEvents /></ProtectedRoute>} />
          <Route path="/communitygroups" element={<ProtectedRoute><CommunityGroups /></ProtectedRoute>} />
          <Route path="/add-event" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
          <Route path="/edit-event/:_id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
          <Route path="/organizations" element={<ProtectedRoute><SearchOrganizations /></ProtectedRoute>} />
          <Route path="/organizations/:orgID" element={<ProtectedRoute><ViewOrganization /></ProtectedRoute>} />
          <Route path="/organizations/register" element={<ProtectedRoute><RegisterOrganization /></ProtectedRoute>} />
          <Route path="/organizations/edit/:orgID" element={<ProtectedRoute><EditOrganization /></ProtectedRoute>} />
          <Route path="/organization-management" element={<ProtectedRoute><OrgManagement /></ProtectedRoute>} />
          <Route path="/manage-database" element={<AdminProtectedRoute ready={ready}><ManageDatabase /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
