import React, {useState, useRef, useCallback} from "react";
import Webcam from 'react-webcam';


const facingModesEnum = {
  USER: "user",
  ENV: "environment"
}

const WebcamCapture = ({ setImage }) => {
  const [facingMode, setFacingMode] = useState(facingModesEnum.user);
  const webcamRef = useRef(null);
  const capture = useCallback(
    async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    },
    [webcamRef, setImage]
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
      <Webcam
        audio={false}
        width={400}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      <button onClick={flipCamera}>Flip Camera</button>
    </>
  );
};

export default WebcamCapture;