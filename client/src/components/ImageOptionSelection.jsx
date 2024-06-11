import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {imgSelectionOptionsMap} from "../utilities/consts";

const ImageOptionSelection = ({ onOptionSelection }) => {
  return (
    <>
      <h3>Smart Med Kit - Injury Assessment</h3>
      <p>Select an Option to Begin:</p>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={6} className="mb-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onOptionSelection(imgSelectionOptionsMap.UPLOAD)}
          >
            Upload Image
          </Button>
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <Button
            variant="success"
            size="lg"
            onClick={() => onOptionSelection(imgSelectionOptionsMap.CAPTURE)}
          >
            Capture Live
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default ImageOptionSelection;