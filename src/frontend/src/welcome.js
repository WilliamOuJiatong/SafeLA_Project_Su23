import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Validation from './LoginValidation';
import axios from 'axios';
import { UserContext } from './UserContext';
import bgVideo from './video1.mp4';
import './begin.css';

//This is a new page!

const WelcomePage = ({ onClick }) => {
    

    const videoContainerStyle = {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      };
    
      const videoBackgroundStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
      };

      const contentStyle = {
        fontFamily: 'Amiri',
        position: 'relative',
        display: 'flex',
        top: '28%',
        left: '20%',
        width: '60%',
        height: '100%',
        flexDirection: 'column',
        color: 'white',
        fontSize: '1rem',
        animation: 'fadeIn 3s'
      };

      const h1Style = {
        color: 'white', 
        fontWeight: 'bold',
        height: '10vh'
      };

    return (
        <div style={videoContainerStyle}>
      <video autoPlay loop muted style={{ ...videoBackgroundStyle, animation: 'fadeIn 3s' }}
        className="videoFadeIn">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        <div style={{ ...contentStyle, animation: 'fadeIn 3s' }}>

      <div>
      <h1 style={{ ...h1Style, textAlign: 'center',fontFamily: 'Big Shoulders Inline Text', textDecoration: 'underline' }}>Welcome to SAFELIVE !</h1>
        <p><h4>Here, we can help you find a safe, comfortable, and reasonably priced new home! Within SAFELIVE, 
            simply click or enter any address you wish to explore, and we will assess the safety of that area as well as the available properties. </h4></p>

            <p style={{ fontFamily: 'Amiri', fontSize: '1rem' }}>
        <h5 style={{ fontStyle: 'italic' }}> *If you discover your dream home through SAFELIVE, consider adding them to our created bookmarking tool, 
            allowing you to browse all your preferred houses and make comparisons!</h5></p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <div>
        <Link to="/login">
        <button className="hover-button" style={{ fontWeight: 'bold' ,fontFamily: 'Big Shoulders Inline Text',animation: 'fadeIn1 3s'}}>Let's go!</button>
      </Link>
    </div>
  </div>
</div> 
</div>
</div>
            
        
    );
};


export default WelcomePage