import React, { useState } from 'react';
import MedKitModel from "../services/MedKitModel";

import WebcamCapture from "./WebcamCapture";
import ImageUploader from "./ImageUploader";
import ImageViewer from "./ImageViewer";

const imageOptionsMap = {
  UPLOAD: 'upload',
  CAPTURE: 'capture',
  UNINITIALIZED: null
}

const ImageContainer = () => {
  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(imageOptionsMap.UNINITIALIZED);

  const handleModelSend = async () => {
    if (image) {
      try {
        const response = await MedKitModel.sendPhoto(image);
        console.log({response});
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const handleRetryClick = () => {
    setImage(null);
  };

  return (
    <div>
      {!selectedOption && (
        <div>
          <button onClick={() => setSelectedOption(imageOptionsMap.UPLOAD)}>Upload Image</button>
          <button onClick={() => setSelectedOption(imageOptionsMap.CAPTURE)}>Capture Photo</button>
        </div>
      )}
      <div>
        {image === null && selectedOption === imageOptionsMap.UPLOAD && <ImageUploader setImage={setImage} image={image}/>}
        {image === null && selectedOption === imageOptionsMap.CAPTURE && <WebcamCapture setImage={setImage}/>}
        {image && <ImageViewer image={image} imageDescription="User injory" />}
      </div>
      {image !== null && <button onClick={handleModelSend}>Send To Model</button>}
      {image !== null && <button onClick={handleRetryClick}>Let Me Try Other Image</button>}
    </div>
  );
};

export default ImageContainer;
