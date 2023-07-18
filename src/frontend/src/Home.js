import 'leaflet/dist/leaflet.css';

import axios from 'axios'; // import axios
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

const Home = () => {
  const [position, setPosition] = useState(null);
  const [description, setDescription] =
    useState('');  // state to store the description

  const MapEvents =
    () => {
      const map = useMapEvents({
        click: (e) => {
          setPosition(e.latlng);
        },
      });
      return null;
    }

  // useEffect hook to send request when position changes
  useEffect(() => {
    if (position) {
      axios
        .get(`http://localhost:8081/crimeData?lat=${position.lat}&lon=${position.lng}`)
        .then(response => {
          setDescription(response.data);
        })
        .catch(error => {
          console.error(`Error: ${error}`);
        });
    }
  }, [position]);

  return (
    <div>
      <MapContainer center={[34.0522, -118.2437]} zoom={13} style={{
        height: '100vh', width: '50%'
      }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution=
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
        <MapEvents />
      </MapContainer>
      <div style={{ width: "50%", float: "right" }}>
        {position && <p>Latitude: {position.lat}, Longitude: {position.lng}</p>
        } {
          description &&
          <p>Description: {description}</p>}
      </div></div>
  );
}

export default Home;
