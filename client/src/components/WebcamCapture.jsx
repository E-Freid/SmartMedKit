import React, {useState, useRef, useCallback} from "react";
import {facingModesEnum} from "../utilities/consts";
import {Button} from "react-bootstrap";

import Webcam from 'react-webcam';

const WebcamCapture = ({ onCapture, isImageSelected }) => {
  const [facingMode, setFacingMode] = useState(facingModesEnum.USER);
  const webcamRef = useRef(null);
  const capture = useCallback(
     () => {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
    },
    [webcamRef, onCapture]
  );
  const flipCamera = useCallback(
    () => {
      const newMode = facingMode !== facingModesEnum.USER ? facingModesEnum.USER : facingModesEnum.ENV;
      setFacingMode(newMode);
    },
    [facingMode]
  );

  const videoConstraints = {
    facingMode
  }

  return (
    <>
      <h3>Capture Your Injury Live</h3>
      {!isImageSelected && (
        <>
          <Webcam
            audio={false}
            width={400}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <Button className="m-3" variant="primary" onClick={capture}>Capture photo</Button>
          <Button variant="secondary" onClick={flipCamera}>Flip Camera</Button>
        </>
      )}

    </>
  );
};

export default WebcamCapture;