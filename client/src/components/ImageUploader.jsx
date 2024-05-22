import React from 'react';

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
    <div>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;