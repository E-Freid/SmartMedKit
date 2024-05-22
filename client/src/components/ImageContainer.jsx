import React, { useState } from 'react';
import MedKitModel from "../services/MedKitModel";

import WebcamCapture from "./WebcamCapture";
import ImageUploader from "./ImageUploader";
import ImageViewer from "./ImageViewer";
import InjuryResult from "./InjuryResult";

const imageOptionsMap = {
  UPLOAD: 'upload',
  CAPTURE: 'capture',
  UNINITIALIZED: null
}

const ImageContainer = () => {
  const [image, setImage] = useState(null);
  const [injuryData, setInjuryData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(imageOptionsMap.UNINITIALIZED);

  const handleImageSend = async () => {
    if (image) {
      try {
        const modelResponse = await MedKitModel.sendPhoto(image);
        setInjuryData(modelResponse);
      } catch (e) {
        console.error('Error sending injury image to MedKit Model:', e);
      }
    }
  };

  const handleRetry = () => {
    setImage(null);
    setSelectedOption(imageOptionsMap.UNINITIALIZED);
    setInjuryData(null);
  };

  return (
    <div>
      {!selectedOption && (
        <div>
          <button onClick={() => setSelectedOption(imageOptionsMap.UPLOAD)}>Upload Image</button>
          <button onClick={() => setSelectedOption(imageOptionsMap.CAPTURE)}>Capture Photo</button>
        </div>
      )}

      {!image && selectedOption === imageOptionsMap.UPLOAD && <ImageUploader onUpload={setImage}/>}
      {!image && selectedOption === imageOptionsMap.CAPTURE && <WebcamCapture onCapture={setImage}/>}
      {image && !injuryData && (
        <div>
          <ImageViewer image={image} imageDescription="Captured Injury Image" />
          <button onClick={handleImageSend}>Send</button>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}

      {injuryData && (
        <InjuryResult
          injuryType={injuryData.class}
          successRate={injuryData.confidence}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
};

export default ImageContainer;
