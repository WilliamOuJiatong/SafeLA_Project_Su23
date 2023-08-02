// UserEdit.js
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'
import styles from './UserEdit.module.css';
import { Link, useNavigate } from 'react-router-dom'
import styles1 from './Home.module.css';
import './begin.css';
import './index.css';
import bgImage from './333.jpg';
import bgImage2 from './222.jpg';

//Change backgroundvideo // line 107-135
//add text to box // line 154-180
//add menu //line 38-70 line139-150 line 194-228


function UserEdit() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const [updatedUser, setUpdatedUser] = useState({
        UserID: user.UserID,
        UserName: user.UserName,
        Email: user.Email,
        Password: user.Password,
    })



    
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
    
      const menu = {
        fontFamily: 'Amiri',
        width: "30%", 
        height: "100%", 
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

    const handleChange = (event) => {
        setUpdatedUser({ ...updatedUser, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.put('http://localhost:8081/useredit', updatedUser)
            if (res.data.status === 'Success') {
                setUser(updatedUser)
                navigate('/home')
            } else {
                alert('Update failed')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:8081/userdelete/${user.UserID}`);
            navigate('/');
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };


    return (

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

          <div className={styles1.header}>
            <button onClick={handleMenuToggle} className={styles1.menuButton}>
              {isMenuOpen ? 'Close Menu' : 'Open Menu'}
              </button>

              <div className={styles1.menuButtonContainer}>
          <button onClick={handleMenuToggle} className={styles1.menuButton}>
            {isMenuOpen ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>

            <form className={styles.form} onSubmit={handleSubmit}>
            <p style={{ fontFamily: 'Big Shoulders Inline Text', fontSize: '20px', marginBottom: '10px',color: 'white' }}>Username</p>
                <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Username"
                    name="UserName"
                    value={updatedUser.UserName}
                    onChange={handleChange}
                />
                <p style={{ fontFamily: 'Big Shoulders Inline Text', fontSize: '20px', marginBottom: '10px',color: 'white' }}>Email</p>
                <input
                    className={styles.formInput}
                    type="email"
                    placeholder="Email"
                    name="Email"
                    value={updatedUser.Email}
                    onChange={handleChange}
                />
                <p style={{ fontFamily: 'Big Shoulders Inline Text', fontSize: '20px', marginBottom: '10px',color: 'white' }}>Password</p>
                <input
                    className={styles.formInput}
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={updatedUser.Password}
                    onChange={handleChange}
                />
                <div style={{ height: '20px' }} />
                <button className={styles.formButton} type="submit">Update</button>
                <br></br><br></br>
                <button onClick={(e) => deleteUser(e)} className={styles.deleteButton}>Delete Account</button>
                <br></br><br></br>
            </form>
        </div >
        </div >

        {isMenuOpen && (
          <div style={darkOverlayStyle}>
         <div style={{ ...menu, backgroundImage: `url(${bgImage2})` }}>
             
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
                <li style={{ marginBottom: '5px' }}>
                    <Link to="/home">
                      <button className={`${styles1.customButton}`}>HOME</button>
                    </Link>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <Link to="/useredit">
                      <button className={`${styles1.customButton}`}>PROFILE</button>
                    </Link>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <Link to="/myfavorite">
                      <button className={`${styles1.customButton}`}>MY FAVORITE</button>
                    </Link>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <button onClick={logout} className={`${styles1.customButton}`}>
                      LOG OUT
                    </button>
                  </li>
                  <li style={{ marginBottom: '5px' }}>
                    <div style={{ height: '40px' }} />
                    <button onClick={handleBackButtonClick} className={`${styles1.customButton}`}>
                      //BACK
                      </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
        )}
      </div>
      
      
    
  );
};

export default UserEdit
