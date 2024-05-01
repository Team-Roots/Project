import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/StuffCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const ListStuff = () => {
  const { ready, stuffs } = useTracker(() => {
    const subscription = Stuffs.subscribeStuff();
    return {
      stuffs: Stuffs.find({}, { sort: { name: 1 } }).fetch(),
      ready: subscription.ready(),
    };
  }, []);

  if (!ready) {
    return <LoadingSpinner />;
  }

  return (
    <Container id={PAGE_IDS.LIST_STUFF} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <h2 className="text-center">List Stuff</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Condition</th>
              </tr>
            </thead>
            <tbody>
              {stuffs.map((stuff) => (
                <tr key={stuff._id}>
                  <td>{stuff.name}</td>
                  <td>{stuff.quantity}</td>
                  <td>{stuff.condition}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListStuff;
