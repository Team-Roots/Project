import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the contact us page. */

const ContactUs = () => (
    <Container fluid style={{ padding: 0 }}>
      <Container
          fluid
          className="d-flex align-items-center justify-content-center"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/headerImage.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100px',
            color: 'white',
            textAlign: 'center',
            overflowY: 'auto',
