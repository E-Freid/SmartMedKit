import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Injury from '../utilities/Injury';

const InjuryResultModal = ({ onHide, injuryType, successRate }) => {
  const getInstructions = (type) => {
    switch (type) {
      case Injury.types.CUT:
        return (
          <div>
            <h5>How to Handle a Cut</h5>
            <ol>
              <li>Clean the cut with water to remove dirt and debris.</li>
              <li>Disinfect the area using iodine from the kit.</li>
              <li>Apply pressure with a clean cloth or bandage to stop the bleeding.</li>
              <li>Use a bandage from the kit to cover the cut.</li>
              <li>Keep the area clean and dry, and change the bandage daily.</li>
              <li>Seek medical attention if the cut is deep, won't stop bleeding, or shows signs of infection.</li>
            </ol>
          </div>
        );
      case Injury.types.BURN:
        return (
          <div>
            <h5>How to Handle a Burn</h5>
            <ol>
              <li>Cool the burn by holding the affected area under cool (not cold) running water for 10-15 minutes.</li>
              <li>Avoid using ice, as it can cause further damage to the tissue.</li>
              <li>Remove any tight clothing or jewelry from the burned area, but do not remove anything stuck to the burn.</li>
              <li>Cover the burn with a sterile, non-stick dressing or clean cloth.</li>
              <li>If necessary, use a plaster from the kit to cover small burns.</li>
              <li>Avoid breaking any blisters that form, as this can lead to infection.</li>
              <li>Seek medical attention if the burn is larger than 3 inches, is on the face, hands, feet, or genitals, or if it looks infected.</li>
            </ol>
          </div>
        );
      default:
        return <p>No instructions available.</p>;
    }
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Injury Analysis Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Injury Type: {injuryType}</h4>
        <h5>Confidence: {Injury.getConfidenceStatus(successRate)}</h5>
        {getInstructions(injuryType)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InjuryResultModal;