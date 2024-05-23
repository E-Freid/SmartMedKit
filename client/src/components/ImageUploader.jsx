import React from 'react';
import {Form} from "react-bootstrap";

const ImageUploader = ({ onUpload }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpload(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Form.Group controlId="formFile" variant="dark">
        <Form.Label><h3>Upload Your Injury Image</h3></Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageChange}/>
      </Form.Group>
    </>
  );
};

export default ImageUploader;