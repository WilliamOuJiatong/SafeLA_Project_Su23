import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Home = () => {
  const [position, setPosition] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
      },
    });
    return null;
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px' }}
        />
      </div>
      <MapContainer center={[34.0522, -118.2437]} zoom={13} style={{ height: "70vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
      </MapContainer>
      {position && <p>Latitude: {position.lat}, Longitude: {position.lng}</p>}
    </div>
  );
}

export default Home;
