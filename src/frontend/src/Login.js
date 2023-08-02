import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Validation from './LoginValidation';
import axios from 'axios';
import { UserContext } from './UserContext';
import bgImage from './111.jpg';
import './begin.css';
import './index.css';

//Altering the appearance of login box-text font and box // line 73-96 line 115-155
//Add video background // line 53-70 line 106-112

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        console.log('$$$', event.target.name)
        console.log('$$$', event.target.value)
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data.status === "Success") {
                        setUser(res.data.user);
                        navigate('/home');
                    }
                    else if (res.data.status === "Fail") {
                        alert("No record existed"); 
                    }
                    else if (res.data.status === "Error") {
                        alert("An error occurred while processing your request"); 
                    }
                })
                .catch(err => console.log(err));
        }
    }

    
      const contentStyle = {
        fontFamily: 'Amiri',
        position: 'relative', 
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '400px',
        width: '100%',
        height: '50%',
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
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

   
        <div style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            animation: 'fadeIn 3s',
            height: '100vh',
          }}
          className="backgroundFadeIn"
      >

        <div style={contentStyle}>
        <h1 style={h1Style}>Sign-In</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                    <label htmlFor="email" style={{ fontFamily: 'Big Shoulders Inline Text' }}><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email'
                            onChange={handleInput} className='form-control rounded-0' />
                        <span className='text-danger'> {errors.email}</span>
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="password" style={{ fontFamily: 'Big Shoulders Inline Text' }}><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                            onChange={handleInput} className='form-control rounded-0' />
                        <span className='text-danger'> {errors.password}</span>
                    </div>
                    <button type="submit"
    className="btn w-100 rounded-0"
    style={{
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }}
  
  onMouseEnter={(e) => e.target.style.backgroundColor = 'black'}
 
  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}>
                    Log in
                    </button>
                    <p><h4 style={{ fontFamily: 'Big Shoulders Inline Text' }}>You agree to our terms and policies</h4></p>
                    <Link to="/signup" className="btn w-100 rounded-0" style={{
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  }}
  
  onMouseEnter={(e) => e.target.style.color = '#007bff'}

  onMouseLeave={(e) => e.target.style.color = 'black'}>Create Account</Link>
                </form>
            </div>
        </div>
            
        
    )
}

export default Login
