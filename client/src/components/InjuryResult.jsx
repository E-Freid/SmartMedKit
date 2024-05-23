import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Injury from '../utilities/Injury';

const InjuryResultModal = ({ injuryType, successRate, onRetry, onHide }) => {
  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Injury Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Type: {injuryType}</p>
        <p>Success Rate: {successRate}</p>
        <p>Instructions: {Injury.getInstructions(injuryType)}</p>
        {successRate < 0.9 && (
          <div>
            <p>The success rate is too low. Please try capturing the photo again.</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {successRate < 0.9 && (
          <Button variant="primary" onClick={onRetry}>
            Retry
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InjuryResultModal;