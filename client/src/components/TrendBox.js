import React from 'react';
import './TrendBox.css';

function TrendBox({ trends }) {
  return (
    <div className="TrendBox">
      <h2>Recent Trends:</h2>
      <ul>
        {trends.map((trend, index) => (
          <li key={index}>{trend.tag} ({trend.type})</li>
        ))}
      </ul>
    </div>
  );
}

export default TrendBox;
