import React from "react";
import {Image, Container} from "react-bootstrap";

const ImageViewer = ({ image }) => {
  return (
    <Container className="d-flex justify-content-center mt-3">
      <Image
        src={image}
        thumbnail
        width={400}
        height={400}
      />
    </Container>
  );
};

export default ImageViewer;

