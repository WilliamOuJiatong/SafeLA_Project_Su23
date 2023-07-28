import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import { useState} from 'react'
import axios from 'axios'
import bgVideo from './video1.mp4';
import './begin.css';

//Altering the appearance of login box-text font and box // line 65-90 line108-152
//Add video background // line 413-60 line 96-103

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
    
        console.log('$$$', event.target.name)
        console.log('$$$',event.target.value)
        
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors( Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    }

    const videoContainerStyle = {
        fontFamily: 'Amiri',
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      };
    
      const videoBackgroundStyle = {
        fontFamily: 'Amiri',
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
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '400px',
        width: '100%',
        height: '60%',
        top: '20%', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '2rem',
        animation: 'fadeIn 2s'
      };

      const h1Style = {
        color: 'white', 
        fontWeight: 'bold',
        fontFamily: 'Big Shoulders Inline Text'
      };

  return (
    <div style={videoContainerStyle}>
     <video autoPlay loop muted style={{ ...videoBackgroundStyle, animation: 'fadeIn 3s' }}
        className="videoFadeIn">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
        </video>

        <div style={contentStyle}>
        <h1 style={h1Style}>Sign-Up</h1> 
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                <label htmlFor="name" style={{ fontFamily: 'Big Shoulders Inline Text' }}><strong>Name</strong></label>
                    <input type="text" placeholder='Enter Name' name='name' 
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>
                <div className='mb-3'>
                <label htmlFor="email" style={{ fontFamily: 'Big Shoulders Inline Text' }}><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email' 
                     onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div className='mb-3'>
                <label htmlFor="password" style={{ fontFamily: 'Big Shoulders Inline Text' }}><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                      onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <button type="submit" className="btn w-100 rounded-0" style={{
    backgroundColor: 'black',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }}
  
  onMouseEnter={(e) => e.target.style.backgroundColor = '#007bff'}
  
  onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}>
                Sign up
                </button>
                <p><h4 style={{ fontFamily: 'Big Shoulders Inline Text' }}>You agree to our terms and policies</h4></p>
                <Link to="/login" className="btn w-100 rounded-0" style={{
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  }}

  onMouseEnter={(e) => e.target.style.color = '#007bff'}
 
  onMouseLeave={(e) => e.target.style.color = 'black'}>Login</Link>                
            </form>

        </div>
        </div>
        

  )
}

export default Signup