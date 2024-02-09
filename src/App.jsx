
import './App.css'
import React, { useState, useEffect, useRef } from "react";
import ThemeContext from "./Components/Contexts/ThemeContext";

import Banner from './Components/Banner/banner';

import MainArea from './Components/Main-area/main';

import Footer from './Components/Footer/Footer';

import Info from './Components/Information/Info';

import './Darkmode.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");
  const [codeTheme, setCodeTheme] = useState(localStorage.getItem("codeTheme") || 'white');
  const [codeLanguage, setCodeLanguage] = useState(localStorage.getItem("codeLanguage") || 'javascript');
  const descriptionSectionRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
    localStorage.setItem("codeTheme", codeTheme);
    localStorage.setItem("codeLanguage", codeLanguage);
  }, [isDarkMode]);
  

  return (
    <>
     <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode,  codeTheme, setCodeTheme, codeLanguage, setCodeLanguage}}>
      <div className="main-container">
        <div className="banner-container"> <Banner /> </div>
        <div className="middle-container"> <MainArea /> </div>
        <div className="footer-container"> <Footer descriptionSectionRef={descriptionSectionRef} /> </div>
        <div ref={descriptionSectionRef} className="description-container"><Info /></div>
      </div>
</ThemeContext.Provider>
    </>
  )
}

export default App
