import React from 'react';
import axios from 'axios';

function ImageUpload({ setImage }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      axios.post('http://localhost:5000/api/content/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          const imageURL = URL.createObjectURL(file);
          setImage(imageURL);
          console.log(`[RESPONSE] ${JSON.stringify(response.data)}`)
        })
        .catch(error => console.error('Error uploading image:', error));
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
}

export default ImageUpload;
