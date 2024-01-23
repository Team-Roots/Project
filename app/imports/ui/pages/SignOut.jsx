import React from 'react';
import { Meteor } from 'meteor/meteor';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // This makes the div take the full height of the viewport
      marginTop: '-380px',
    }}
    >
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="/images/Voluntree.logo.png" />
        <Card.Body>
          <Card.Title style={{ fontSize: '34px' }}>You signed out of your account</Card.Title>
          <Card.Text>
            it's a good idea to close all browser windows.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignOut;
