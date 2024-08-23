import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import './SideBar.css';
import TrendBox from './TrendBox';

function SideBar({ setImage }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios.get('http://localhost:5000/api/content')
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching images:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/content/${id}`)
      .then(() => fetchImages())
      .catch(error => console.error('Error deleting image:', error));
  };

  const handleSelect = (image) => {
    setSelectedImage(image);
    setImage(image);  // Assuming this sets the image in some parent component or state
  };

  return (
    <div className="SideBar">
      <TrendBox/>
      <h2>Upload</h2>
      <ImageUpload setImage={setImage} />
      <h2>Gallery</h2>
      <button onClick={fetchImages} className="refreshButton">Refresh Gallery</button>
      <div className="Gallery">
        {images.map(image => (
          <div key={image._id} className="ImageWrapper">
            <img 
              src={`data:${image.image.contentType};base64,${btoa(
                new Uint8Array(image.image.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
              )}`} 
              alt="Uploaded" 
              className={selectedImage && selectedImage._id === image._id ? 'selected' : ''}
            />
            <button className="MarginButton" onClick={() => handleDelete(image._id)}>Delete</button>
            <button className="MarginButton" onClick={() => handleSelect(image)}>Select Photo</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
