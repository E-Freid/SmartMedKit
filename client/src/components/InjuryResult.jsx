import React from 'react';
import Injury from '../utilities/Injury';

const InjuryResult = ({ injuryType, successRate, onRetry }) => {
  return (
    <div>
      <h2>Injury Result</h2>
      <p>Type: {injuryType}</p>
      <p>Success Rate: {successRate}</p>
      <p>Instructions: {Injury.getInstructions(injuryType)}</p>
      {successRate < 0.9 && (
        <div>
          <p>The success rate is too low. Please try capturing the photo again.</p>
          <button onClick={onRetry}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default InjuryResult;