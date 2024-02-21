import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Import the icons from react-icons

const Footer = () => (
  <footer className="mt-auto py-3 robotoText" style={{ backgroundColor: '#02B5A6' }}>
    <Container>
      <Row className="text-white">
        <Col xs={12} md={4}>
          <h5 className="footer-heading poppinsText">Resources</h5>
          <ul>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><a href="mailto:contact@voluntree.com" aria-label="Contact Us">Contact Us</a></li>
          </ul>
        </Col>

        <Col xs={12} md={4}>
          <h5 className="footer-heading poppinsText">Grow the Community</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/eventopportunities">Volunteer</Link></li>
            <li><Link to="/post-event">Post an Event</Link></li>
            <li><Link to="/community-groups">Community Groups</Link></li>
          </ul>
        </Col>

        <Col xs={12} md={4}>
          <h5 className="footer-heading poppinsText">Follow Us</h5>
          <div>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={30} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ marginLeft: '10px' }}>
              <FaInstagram size={30} />
            </a>
            {/* Add additional social media icons as needed */}
          </div>
          <p>
            Where individuals come together, plant the seeds of compassion, and watch as the collective efforts grow into a flourishing forest of shared impact.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-center text-muted">
          <p>© 2024 Voluntree. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
