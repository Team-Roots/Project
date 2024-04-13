import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Form, Row, Col, ListGroup, Modal, InputGroup } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import { PersonFillAdd } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../../../utilities/PageIDs';
import { Organizations } from '../../../../api/organization/OrganizationCollection';
import LoadingSpinner from '../../LoadingSpinner';
import { ROLE } from '../../../../api/role/Role';
import NotAuthorized from '../../../pages/NotAuthorized';
import NotFound from '../../../pages/NotFound';
import { OrganizationAdmin } from '../../../../api/organization/OrganizationAdmin';

const EditDetails = () => {
  return <h3>edit details</h3>;
};

export default EditDetails;
