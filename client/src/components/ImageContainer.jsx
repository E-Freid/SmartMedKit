import React from 'react';
import {Button} from "react-bootstrap";

import ImageViewer from "./ImageViewer";

const ImageContainer = ({ handleImageSend, handleRetry, image }) => {
  return (
    <>
      <>
        <ImageViewer image={image} />
        <Button className="m-3" variant="primary" onClick={handleImageSend}>Send</Button>
        <Button variant="danger" onClick={handleRetry}>Retry</Button>
      </>
    </>
  );
};

export default ImageContainer;
