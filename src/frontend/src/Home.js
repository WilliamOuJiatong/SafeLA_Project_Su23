import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import flagIcon from './flag.png'; // adjust path to your flag.png
import { UserContext } from './UserContext';
import styles from './Home.module.css';
import bgImage from './pack10.jpg';
import bgImage2 from './222.jpg';
import './begin.css';
import './index.css';



//Altering the appearance of rentinfo and location //line 214-243
//Add the menu with the dark page transition //line 120-152 line160-175 line 248-291
//Add background for menu and home page //line 160-167
//Add animation to search bar //line 112-115 line190-199

const flagIconInstance = new Icon({
  iconUrl: flagIcon,
  iconSize: [25, 41], // size of the icon, adjust these values
  iconAnchor: [12, 41] // point of the icon which will correspond to marker's location, adjust if necessary
});

const Home = () => {
  const [position, setPosition] = useState(null);
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [rentInfo, setRentInfo] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
 

  const logout = () => {
    console.log("Current user before logout: ", user);
    setUser(null);  // reset user state
    navigate('/');  // redirect to login page
  };

  
  
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const searchLocation = async () => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${searchTerm + ", Los Angeles, California"}&key=c6501429a35a4241a4b9994b3957c8f4`);
      
      if(response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        setPosition({ lat, lng });
      } else {
        console.log("Input street does not exist in Los Angeles, California");
        alert("Input street does not exist in Los Angeles, California"); 
      }
    } catch (error) {
      console.error(error);
      alert("OOps, theres an error");
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
          console.log("Updated description: ", response.data);
        })
        .catch(error => {
          console.error(`Error: ${error}`);
        });
    }
  }, [position]);

  useEffect(() => {
    if (position) {
      axios
        .get(`http://localhost:8081/rentInfo?lat=${position.lat}&lon=${position.lng}`)
        .then(response => {
          console.log(response.data); // log the data here
          setRentInfo(response.data);
          console.log("Updated rentInfo: ", response.data); // Log the new state
        })
        .catch(error => {
          console.error(`Error: ${error}`);
        });
    }
  }, [position]);


  const toggleSearchBarAnimation = () => {
    setIsSearchBarExpanded(!isSearchBarExpanded);
  };



  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackButtonClick = () => {
    setIsMenuOpen(false); 
  };

  //Add favorite in each row of tract 
  const addFavorite = async (rentInfoItem) => {
    try {
      const payload = {
        UserID: user.UserID,
        Tract: rentInfoItem.Tract,
        Year: rentInfoItem.Year,
        Amount: rentInfoItem.Amount,
        RateNum: description.Descriptions, 
      };
  
      console.log("Payload in addFavorite: ", payload); // Log the payload for debugging
  
      const response = await axios.post('http://localhost:8081/favorites/add', payload);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const addSubscription = async () => {
    try {
      const payload = {
        UserID: user.UserID,
        lat: position.lat,
        lng: position.lng
      };
  
      console.log("Payload in addSubscription: ", payload); // Log the payload for debugging
  
      const response = await axios.post('http://localhost:8081/Subscription/add', payload);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const removeFavorite = async (rentInfoItem) => {
    try {
      const payload = {
        UserID: user.UserID,
        Tract: rentInfoItem.Tract,
        Year: rentInfoItem.Year,
        Amount: rentInfoItem.Amount,
        RateNum: description.Descriptions,
      };
  
      console.log("Payload in removeFavorite: ", payload); // Log the payload for debugging
  
      const response = await axios.delete('http://localhost:8081/favorites/remove', { data: payload });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 
  const removeSubscription = async () => {
    try {
      const payload = {
        UserID: user.UserID,
        lat: position.lat,
        lng: position.lng
      };
  
      console.log("Payload in removeSubscription: ", payload); // Log the payload for debugging
  
      const response = await axios.delete('http://localhost:8081/Subscription/remove', { data: payload });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const menu = {
    fontFamily: 'Amiri',
    width: "30%", 
    height: "100vh", 
    position: "absolute",
    top: "0",
    right: "0",
    zIndex: "9999",
    animation: 'fadeIn 2s',
  };

  const darkOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    zIndex: 9998, 
    animation: 'fadeIn 3s',
    display: isMenuOpen ? 'block' : 'none', 

    
  };

 
  const menuStyles = {
    width: '60vh',
    height: '100vh',
    backgroundImage: `url(${bgImage2})`,
    backgroundSize: 'cover',

  };
  
    return (
      <>
     
      <div style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        animation: 'fadeIn 3s',
      }}
      className="backgroundFadeIn"

      >

          <div className={styles.container}>
            <div className={styles.header}>
              <button onClick={handleMenuToggle} className={styles.menuButton}>
                {isMenuOpen ? 'Close Menu' : 'Open Menu'}
              </button>
              
                {user && (
                   <div>
                  <div className={styles.welcomeSection}>
                  <h2 style={{ fontWeight: 'bold', paddingTop: '10px' }}>Welcome, {user.UserName}! Let's Search for a New Location.</h2>
                   </div>
                    <div style={{
  position: 'absolute',
  top: '10.5%', 
  left: '5%', 
  color: 'white',
  fontFamily: 'Big Shoulders Inline Text',
  textDecoration: 'underline'
}}>
                      <h4>Your Email : {user.Email}</h4>
                    </div>
                    </div>
                    

                )}
               
              <input
               className={`${styles.searchBar} ${isSearchBarExpanded ? styles.expanded : ''}`}
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={event => event.key === 'Enter' && searchLocation()}
                onFocus={toggleSearchBarAnimation} // Add onFocus event to expand the search bar
              onBlur={toggleSearchBarAnimation} // Add onBlur event to collapse the search bar
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
              {description && (
                 <p>
                 <span style={{ paddingLeft: '150px'  ,fontWeight: 'bold'}}>Latitude: {description.LAT},</span><br />
                 <span style={{ paddingLeft: '135px'  ,fontWeight: 'bold'}}>Longitude: {description.LON},</span><br />
                 <span style={{ paddingLeft: '100px'  ,fontWeight: 'bold',color: 'pink'}}>Descriptions: {description.Descriptions}</span>
               </p>
              )}
            </div>
  <div className={`${styles.rentInfoContainer}`}>
            
              {Array.isArray(rentInfo) &&
                rentInfo.map((info, index) => (
                  <div key={index}>
                    <p><span style={{ paddingLeft: '200px' ,fontWeight: 'bold' ,fontStyle: 'italic', color: 'lightblue', textDecoration: 'underline'}}>-Tract: {info.Tract}</span></p>

                    <button  className = {styles.menuButtonfavo2} onClick={() => {removeFavorite(info); removeSubscription();}}>—</button>
                    <button  className = {styles.menuButtonfavo3} onClick={() => {addFavorite(info); addSubscription();}}>+</button>


                    <p><span style={{ paddingLeft: '200px' }}>Price: {info.Amount}</span></p>
                    <p><span style={{ paddingLeft: '200px' }}>CorrYear: {info.Year}</span></p>
                    <p><span style={{ paddingLeft: '200px' }}>Distance: {info.Distance}</span></p>
                    <p><span style={{ paddingLeft: '200px' }}>AvgPrice: {info.AverageAmount}</span></p>
                  </div>
                ))}
            </div>
          </div>
        </div>
    
      
    
        
            
          <div className={styles.menuButtonContainer}>
        <button onClick={handleMenuToggle} className={styles.menuButton}>
          {isMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      {isMenuOpen && (
 <div style={darkOverlayStyle}>
  <div style={menu}>
 <div style={menuStyles}>
    
   
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
 
      <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
      <li style={{ marginBottom: '5px' }}>
                    <Link to="/home">
                      <button className={`${styles.customButton}`}>HOME</button>
                    </Link>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
  <Link to="/useredit"> 
  <button className={`${styles.customButton}`}>
            PROFILE
          </button>
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
        <Link to="/myfavorite"> 
  <button className={`${styles.customButton}`}>
        MY FAVORITE
          </button>
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
        <button onClick={logout} className={`${styles.customButton}`}>LOG OUT
          </button>
        </li>
        <li style={{ marginBottom: "5px" }}>
        <div style={{ height: '40px' }} />
                <button onClick={handleBackButtonClick} className={`${styles.customButton}`}>
                  //BACK
                </button>
              </li>
      </ul>
    </div>
  </div>
  </div>
  </div>
  
)}
    </>
  );
};

export default Home;
