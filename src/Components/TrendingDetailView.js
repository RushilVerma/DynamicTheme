import React, { useState, useEffect } from 'react';
import './css/TrendingDetailView.css';

const TrendingDetailView = ({ search }) => {
  const [imageUrl, setImageUrl] = useState(search.graphic || ''); // Initialize with the existing image URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update imageUrl when the search prop changes
  useEffect(() => {
    setImageUrl(search.graphic || ''); // Reset imageUrl when the new search prop comes in
    setError(null); // Clear previous errors when switching searches
  }, [search]); // This runs whenever the 'search' prop changes

  // Handle click on "Generate" button
  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);

    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch(`http://localhost:4000/get-image?query=${search.query}`);
      let data = await response.json();
      
      if(response.code === 200){
        const response = await fetch(`http://localhost:4000/generate-image?query=${search.query}`);
        data = await response.json();
      }
      
      if (response.ok) {
        setImageUrl(data.imageUrl);  // Set the image URL from the response
      } else {
        throw new Error('Error generating image');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detail-view">
      <h1>{search.query}</h1>
      <p><strong>Date:</strong> {new Date(search.date).toLocaleDateString()}</p>
      <p><strong>Traffic:</strong> {search.traffic}</p>

      {search.related_queries && search.related_queries.length > 0 && (
        <>
          <h3>Related Searches:</h3>
          <ul>
            {search.related_queries.map((query, index) => (
              <li key={index}>{query.query}</li>
            ))}
          </ul>
        </>
      )}

      {/* Generate Button */}
      <button onClick={handleGenerateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {/* Loading Animation */}
      {loading && <div className="loading">Loading...</div>}

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Show Generated Image or Existing Image */}
      {imageUrl && (
        <div className="image-box">
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default TrendingDetailView;
