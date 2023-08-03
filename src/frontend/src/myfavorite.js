import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import flagIcon from './flag.png'; 
import { UserContext } from './UserContext';
import styles from './Home.module.css';
import bgImage from './pack11.jpg';
import bgImage2 from './222.jpg';
import './begin.css';
import './index.css';
import './picture.png';


const MyFavorite = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    setUser(null); 
    navigate('/'); // Assuming you have a navigate function from react-router-dom
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackButtonClick = () => {
    setIsMenuOpen(false);
  };

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
        if (user) {
            const res = await axios.get(`http://localhost:8081/favorites/${user.UserID}`);
            console.log(res.data); 
            if (res.data.data) { // Now accessing the "data" property of "res.data"
                setFavorites(res.data.data); // Set favorites to the array from the server
            } else {
                setFavorites([]);
            }
        }
    };
    fetchFavorites();
}, [user]);

const handleRemoveFavorite = async (favorite) => {
    await axios.delete(`http://localhost:8081/favorites/delete/${user.UserID}`, { data: favorite });
    setFavorites(favorites.filter(f => f !== favorite));
};


const [subscriptions, setSubscriptions] = useState([]);

useEffect(() => {
  const fetchSubscriptions = async () => {
      if (user) {
          const res = await axios.get(`http://localhost:8081/Subscription/${user.UserID}`);
          console.log(res.data); 
          if (res.data.data) { // Now accessing the "data" property of "res.data"
              setSubscriptions(res.data.data); // Set favorites to the array from the server
          } else {
              setSubscriptions([]);
          }
      }
  };
  fetchSubscriptions();
}, [user]);

const handleRemoveSubscription = async (subscription) => {
  await axios.delete(`http://localhost:8081/Subscription/remove/${user.UserID}`, { data: subscription });
  setSubscriptions(subscriptions.filter(s => s !== subscription));
};


  const menu = {
    fontFamily: 'Amiri',
    width: "30%", 
    height: "100%", 
    position: "absolute",
    top: "0",
    right: "0",
    zIndex: "9999",
    animation: 'fadeIn 2s',
    backgroundImage: `url(${bgImage2})`,
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
    
      <div
        style={{
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
                  <h2 style={{ fontWeight: 'bold', paddingTop: '10px',paddingLeft: '10px' ,opacity: 0.7,fontSize:'50px',margin: '20% 0 0 -50%' }}>Hello, {user.UserName}! This is all the properties you are interested in...</h2>
                   </div>
                    </div>
                    )} 


<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
          <div style={{ height: '600px', overflowY: 'auto', maxWidth: '100%' }}>
          <style>
  {`
    
    div::-webkit-scrollbar {
      width: 50px; 
    }

    div::-webkit-scrollbar-thumb {
      background-color: white;  
      border-radius: 30px;
    }

    div::-webkit-scrollbar-thumb:hover {
      background-color: black;

    }

    div::-webkit-scrollbar-track {
      background-image: url('./picture.png');
      border-radius: 6px; 
    }
  `}
</style>
{favorites.map(favorite => (
    <div key={favorite.Tract} style={{ fontWeight: 'bold', opacity: 1.7, textAlign: 'center', marginBottom: '90px', fontSize: '25px'}}>
      <div style={{ position: 'relative' }}>
      <p style={{ backgroundColor: 'rgba(0, 123, 255, 0.7)', color: 'white' }}>
       Tract: {favorite.Tract}, Year: {favorite.Year}, Amount: {favorite.Amount}, RateNum: {favorite.RateNum}</p>


       <button className = {styles.menuButtonfavo} onClick={() => {handleRemoveFavorite(favorite);handleRemoveSubscription()}}>—</button>

    </div></div>
))}
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
             
          
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>

                <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
      <li style={{ marginBottom: '5px' }}>
                    <Link to="/home">
                      <button className={`${styles.customButton}`}>HOME</button>
                    </Link>
                  </li>
                  <li style={{ marginBottom: '5px' }}>
  <Link to="/useredit"> 
  <button className={`${styles.customButton}`}>
            PROFILE
          </button>
          </Link>
        </li>
        <li style={{ marginBottom: "5px" }}>
        <Link to="/myfavorite"> 
  <button className={`${styles.customButton}`}>
        MY FAVORITE
          </button>
          </Link>
        </li>
        <li style={{ marginBottom: "5px" }}>
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
      </div>
      </div>
      </div>
      
      
    
  );
};

export default MyFavorite;
