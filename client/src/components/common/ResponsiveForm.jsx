import React from "react";
import {Row, Col, Form} from "react-bootstrap";

const ResponsiveForm = ({ onSubmit, children }) => {
  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={8} md={6} lg={4}>
        <Form onSubmit={onSubmit}>
          {children}
        </Form>
      </Col>
    </Row>
  );
}

export default ResponsiveForm;