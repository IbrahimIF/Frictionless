import './App.css'
import React, { useRef } from "react";
import {ThemeContext, ThemeProvider} from "./Components/Context/SavedChanges";


import Banner from './Components/Banner/banner';

import MainArea from './Components/Main-area/main';

import Footer from './Components/Footer/Footer';

import Info from './Components/Information/Info';

import './Darkmode.css'

function App() {
  const descriptionSectionRef = useRef(null);

  return (
    <>
     <ThemeProvider>
      <div className="main-container">
        <div className="banner-container"> <Banner /> </div>
        <div className="middle-container"> <MainArea /> </div>
        <div className="footer-container"> <Footer descriptionSectionRef={descriptionSectionRef} /> </div>
        <div ref={descriptionSectionRef} className="description-container"><Info /></div>
      </div>
</ThemeProvider>
    </>
  )
}

export default App