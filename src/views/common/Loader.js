import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ReactComponent as Spinner } from 'assets/loader.svg';

export default () => (
  <Container className="h-100 d-flex justify-content-center align-items-center">
    <Row>
      <Col>
        <Spinner />
        <h4 className="text-center">Loading...</h4>
      </Col>
    </Row>
  </Container>
);