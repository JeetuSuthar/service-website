import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'


function App() {
  

  return (
    <div className='bg-gradient-to-b from-black to-gray-900 h-screen'>
      
    
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/login" element={<Login/>} /> 
     
    </Routes>
  </Router>
  </div>
  )
}

export default App
