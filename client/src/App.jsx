import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Settings from './components/Settings.jsx'
import User from './components/User.jsx'
import Dashboard from './components/Dashboard.jsx'
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
                  </Routes>
    
    </>
  )
}

export default App
