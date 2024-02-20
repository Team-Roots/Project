import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Import the icons from react-icons

const Footer = () => (
  <footer className="mt-auto py-4" style={{ backgroundColor: '#02B5A6' }}>
    <Container>
      <Row className="text-white justify-content-center">
        <Col xs={12} md={4} className="mb-3">
          <h5 className="footer-heading">Resources</h5>
          <ul className="list-unstyled">
            <li><Link to="/aboutus" className="text-white">About Us</Link></li>
            <li><Link to="/faq" className="text-white">FAQ</Link></li>
            <li><Link to="/contact" className="text-white">Contact Us</Link></li>
          </ul>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <h5 className="footer-heading">Grow the Community</h5>
          <ul className="list-unstyled">
            <li><Link to="/" className="text-white">Home</Link></li>
            <li><Link to="/volunteer" className="text-white">Volunteer</Link></li>
            <li><Link to="/post-event" className="text-white">Post an Event</Link></li>
            <li><Link to="/community-groups" className="text-white">Community Groups</Link></li>
          </ul>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <h5 className="footer-heading">Follow Us</h5>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaFacebook size={30} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white" style={{ marginLeft: '20px' }}>
              <FaInstagram size={30} />
            </a>
            {/* Add additional social media icons as needed */}
          </div>
          <p className="mt-2">
            Where individuals come together, plant the seeds of compassion, and watch as the collective efforts grow into a flourishing forest of shared impact.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-center text-white">
          <small>© 2024 Voluntree. All rights reserved.</small>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
