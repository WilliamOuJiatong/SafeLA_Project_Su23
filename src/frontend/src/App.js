import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserContext } from './UserContext'
import UserEdit from './UserEdit'

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/useredit' element={<UserEdit />}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter >
  )
}

export default App