import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrendBox.css';

function TrendBox() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = () => {
    axios.get('http://localhost:5000/api/trends')
      .then(response => setTrends(response.data))
      .catch(error => console.error('Error fetching trends:', error));
  };

  return (
    <div className="TrendBox">
      <h2>Recent Trends:</h2>
      <ul>
        {trends.map((trend, index) => (
          <li key={index}>{trend.tag}</li>
        ))}
      </ul>
    </div>
  );
}

export default TrendBox;