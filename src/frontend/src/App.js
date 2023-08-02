import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './UserContext';
import WelcomePage from './welcome';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import UserEdit from './UserEdit';
import MyFavorite from './myfavorite';
import './begin.css';

//add new path welcome page and myfavorite page

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/useredit" element={<UserEdit />} />
          <Route path="/myfavorite" element={<MyFavorite />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;