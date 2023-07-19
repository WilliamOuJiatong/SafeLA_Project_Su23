import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import flagIcon from './flag.png'; // adjust path to your flag.png
import { UserContext } from './UserContext';
import styles from './Home.module.css';

const flagIconInstance = new Icon({
  iconUrl: flagIcon,
  iconSize: [25, 41], // size of the icon, adjust these values
  iconAnchor: [12, 41] // point of the icon which will correspond to marker's location, adjust if necessary
});

const Home = () => {
  const [position, setPosition] = useState(null);

  const [description, setDescription] =
    useState('');  // state to store the description

  const [searchTerm, setSearchTerm] = useState('');

  const { user } = useContext(UserContext);
  console.log(user);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const searchLocation = async () => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${searchTerm}&key=c6501429a35a4241a4b9994b3957c8f4`);
      const { lat, lng } = response.data.results[0].geometry;
      setPosition({ lat, lng });
    } catch (error) {
      console.error(error);
    }
  }

  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        setPosition(e.latlng);
      },
    });

    // Center map to position after each render if position is defined
    React.useEffect(() => {
      if (position) {
        map.flyTo(position);
      }
    }, [map]); // Removed 'position' from dependency array

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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.welcomeSection}>
          {user && (
            <div>
              <h2>Welcome, {user.UserName}!</h2>
              <p>Your email is: {user.Email}</p>
            </div>
          )}
          <Link to="/useredit">
            <button className={styles.editButton}>Edit</button>
          </Link>
        </div>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={event => event.key === 'Enter' && searchLocation()}
        />
      </div>
      <MapContainer center={[34.0522, -118.2437]} zoom={13} className={styles.mapContainer}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && <Marker position={position} icon={flagIconInstance} />}
        <MapEvents />
      </MapContainer>
      <div className={styles.footer}>
        {position && <p>Latitude: {position.lat}, Longitude: {position.lng}</p>}
        {description &&
          <p>Latitude: {description.LAT},<br />
            Longitude: {description.LON},<br />Descriptions: {description.Descriptions}</p>}
      </div>
    </div>
  );
}

export default Home;
