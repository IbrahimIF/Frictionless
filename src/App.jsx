
import './App.css'
import React, { useState, useEffect } from "react";
import ThemeContext from "./Components/Contexts/ThemeContext";

import Banner from './Components/Banner/banner';

import MainArea from './Components/Main-area/main';

import Footer from './Components/Footer/Footer';

import './Darkmode.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);
  

  return (
    <>
     <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode}}>
<div className="main-container">
  <div className="banner-container"> <Banner /> </div>
  <div className="middle-container"> <MainArea /> </div>
  <div className="footer-container"> <Footer /> </div>
</div>
</ThemeContext.Provider>
    </>
  )
}

export default App
