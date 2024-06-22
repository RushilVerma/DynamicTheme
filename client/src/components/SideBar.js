import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import './SideBar.css';
import TrendBox from './TrendBox'
import axios from 'axios';

function SideBar({ setImage }) {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/trends')
      .then(response => setTrends(response.data))
      .catch(error => console.error('Error fetching trends:', error));
  }, []);

  return (
    <div className="SideBar">
      <h2>Upload</h2>
      <ImageUpload setImage={setImage} />
      <TrendBox trends={trends} />
    </div>
  );
}

export default SideBar;
