import React, { useEffect, useState } from 'react';
import './App.css';
import TrendingSidebar from './Components/TrendingSidebar';
import TrendingDetailView from './Components/TrendingDetailView';
import axios from 'axios';

const App = () => {
  const [searches, setSearches] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(null);

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    try {
      const URL = `http://localhost:4000/trending-data`
      const response = await axios.get(URL);
      console.log(response)
      setSearches(response.data);
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
  };

  const handleCardClick = (search) => {
    setSelectedSearch(search);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <TrendingSidebar searches={searches} onCardClick={handleCardClick} />
      </div>
      <div className="main-view">
        {selectedSearch ? (
          <TrendingDetailView search={selectedSearch} />
        ) : (
          <div>Select a trending topic to see details</div>
        )}
      </div>
    </div>
  );
};

export default App;
