import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Abouts from './pages/Abouts'
import LogIn from './pages/LogIn'
import Header from './components/Header'

export default function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/sign-up" element={<SignUp />}/>
<Route path="/profile" element={<Profile />}/>
<Route path="/abouts" element={<Abouts/>}/>
<Route path="/log-in" element={<LogIn/>}/>
  </Routes>
  
  </BrowserRouter>
}
