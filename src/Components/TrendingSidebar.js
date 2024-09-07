import React from 'react';
import './css/TrendingSidebar.css';

const TrendingSidebar = ({ searches, onCardClick }) => {
  return (
    <div className="sidebar-container">
      {searches.length > 0 ? (
        searches.map((search, index) => (
          <div key={index} className="search-card" onClick={() => onCardClick(search)}>
            <h4>{search.query}</h4>
          </div>
        ))
      ) : (
        <div>No trending data available</div>
      )}
    </div>
  );
};

export default TrendingSidebar;