import React from 'react';
import { Meteor } from 'meteor/meteor';
// Removed the Button import as it's not used
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Container id={PAGE_IDS.SIGN_OUT}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // This makes the div take the full height of the viewport
        marginTop: '-220px',
      }}
      >
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="/images/Voluntree.logo.png" />
          <Card.Body>
            <Card.Title style={{ fontSize: '34px' }}>You signed out of your account</Card.Title>
            <Card.Text>
              it&apos;s a good idea to close all browser windows.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default SignOut;
