import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardFeatures from './components/home/CardFeatures';
import Home from './components/home/Home';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/Signup';
import About from './components/About';
import Service from './components/Service';
import UserNavbar from './components/business-components/UserNavbar';
import DashBoard from './components/business-components/DashBoard';
function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user-dashboard" element={<DashBoard />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
