import React from "react";

const ImageViewer = ({ image, imageDescription }) => {
  return (
    <>
      <img src={image} alt={imageDescription} width="300" height="300" />
    </>
  );
};

export default ImageViewer;

