import React, { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import TopBar from './components/Topbar';
import DisplayImage from './components/DisplayImage';
import './App.css';

function App() {
  const [image, setImage] = useState(null);

  return (
    <div className="App">
      <TopBar />
      <div className="App-body">
        <SideBar setImage={setImage} />
        <div className="App-content">
          {image && <DisplayImage image={image} />}
        </div>
      </div>
    </div>
  );
}

export default App;
