import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardFeatures from './components/home/CardFeatures';
function App() {
  return (
    <>
      <NavBar/>
      <CardFeatures/>
    </>
  )
}

export default App
