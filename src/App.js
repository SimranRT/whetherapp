import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('Current');

  // Replace with your actual OpenWeatherMap API Key
  const API_KEY = '6cf326e3eba6a03a976df25187d75c77'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      }).catch((err) => {
        alert("Location not found");
      });
      setLocation('');
    }
  };

  return (
    <div className="app-container">
      <h1>Weather</h1>
      <p style={{ opacity: 0.7, marginBottom: '20px' }}>
        {activeTab} weather lookup — powered by OpenWeather
      </p>

      {/* Tabs Section */}
      <div className="tabs">
        {['Current', 'Historical', 'Marine'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Section */}
      <div className="search-box">
        <h3>{activeTab} Weather</h3>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Enter a city to get live conditions.</p>
        <div className="input-wrapper">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="e.g. London, New York, Tokyo"
            type="text"
          />
          <button className="get-btn" onClick={searchLocation}>Get Weather</button>
        </div>
      </div>

      {/* Results Section (Only shows if data exists) */}
      {data.name !== undefined && (
        <div className="result-display">
          <div className="top">
            <p style={{ fontSize: '2rem' }}>{data.name}</p>
            <h1 className="temp">{data.main ? data.main.temp.toFixed() : null}°F</h1>
            <p>{data.weather ? data.weather[0].main : null}</p>
          </div>

          <div className="details">
            <div>
              <p className='bold'>{data.main ? data.main.feels_like.toFixed() : null}°F</p>
              <p>Feels Like</p>
            </div>
            <div>
              <p className='bold'>{data.main ? data.main.humidity : null}%</p>
              <p>Humidity</p>
            </div>
            <div>
              <p className='bold'>{data.wind ? data.wind.speed.toFixed() : null} MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== 'Current' && (
        <p style={{ marginTop: '20px', color: '#ffcc00' }}>
          Note: {activeTab} data requires a premium API subscription.
        </p>
      )}
    </div>
  );
}

export default App;