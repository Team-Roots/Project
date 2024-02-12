import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Nav, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import OrganizationCard from './OrganizationCard';
import BarGraph from './BarGraph';
import FadeInSection from './FadeInSection';

const LandingPanel = ({ orgs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 1;

  const totalCards = orgs.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const orgsPerPage = (page) => {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return orgs.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.landing-section');
      const scrollTop = window.scrollY;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
          setCurrentPage(index + 1);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id={PAGE_IDS.LANDING} className="py-1 m-auto">
      <div>
        <Nav variant="underline" defaultActiveKey="/home" />
        <div className="landing-section" id="home">
          <Container>
            <FadeInSection>
              <h2>Welcome back!</h2>
            </FadeInSection>
            <Row className="pt-3">
              <Col>
                <FadeInSection>
                  <h5>Your Volunteer Stats</h5>
                  <p>Total Hours Served: #<br />
                    Organizations Helped: #<br />
                  </p>
                </FadeInSection>
              </Col>
              <Col>
                <FadeInSection>
                  <BarGraph fluid />
                </FadeInSection>
              </Col>
              <Col>
                <FadeInSection>
                  <h5>Upcoming Events</h5>
                  <p>Events in the upcoming week: <br />
                    Link to calendar for more information <br />
                  </p>
                </FadeInSection>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="landing-section" id="giveHelp">
          <Container>
            <FadeInSection>
              <h2>Give Help</h2>
            </FadeInSection>
            <Container>
              <Row>
                <FadeInSection>
                  {orgsPerPage(currentPage).map((org) => (
                    <OrganizationCard key={org._id} org={org} />
                  ))}
                </FadeInSection>
              </Row>
            </Container>
            <Container>
              <FadeInSection>
                {[...Array(totalPages).keys()].map((page) => (
                  <Button
                    key={page}
                    variant="outline-primary"
                    onClick={() => setCurrentPage(page + 1)}
                    style={{ borderRadius: '50%', margin: '0 5px' }}
                  >
                    {page + 1}
                  </Button>
                ))}
              </FadeInSection>
            </Container>
          </Container>
        </div>
        <div className="landing-section" id="needHelp">
          <Container>
            <FadeInSection>
              <h2>Need Help</h2>
              <p>ALL HELP REQUEST RELATED INFO</p>
            </FadeInSection>
          </Container>
        </div>
      </div>
    </div>
  );
};

LandingPanel.propTypes = {
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
      organizationOwner: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      ageRange: PropTypes.instanceOf(Object).isRequired,
    }),
  ).isRequired,
};

export default LandingPanel;
