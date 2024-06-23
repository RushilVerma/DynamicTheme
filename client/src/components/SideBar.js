import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import './SideBar.css';
import TrendBox from './TrendBox';

function SideBar({ setImage }) {
  const [trends, setTrends] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchTrends();
    fetchImages();
  }, []);

  const fetchTrends = () => {
    axios.get('http://localhost:5000/api/trends')
    .then(response => setTrends(response.data))
    .catch(error => console.error('Error fetching trends:', error));
  }

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

  return (
    <div className="SideBar">
      
      <TrendBox trends={trends} />
      <h2>Upload</h2>
      <ImageUpload setImage={setImage} />
      <h2>Gallery</h2>
      <div className="Gallery">
        {images.map(image => (
          <div key={image._id} className="ImageWrapper">
            <img 
              src={`data:${image.image.contentType};base64,${btoa(
                new Uint8Array(image.image.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
              )}`} 
              alt="Uploaded" 
            />
            <button onClick={() => handleDelete(image._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;