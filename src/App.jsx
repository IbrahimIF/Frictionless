import React, { useRef } from "react";
import { ThemeProvider } from "./Components/Context/SavedChanges";
import { Analytics } from "@vercel/analytics/react"

import './App.css'
import './Darkmode.css'

import Banner from './Components/Banner/banner';
import MainArea from './Components/Main-area/main';
import Footer from './Components/Footer/Footer';
import Info from './Components/Information/Info';


function App() {
  /*is made for the automatic scroll down to info section*/
  const descriptionSectionRef = useRef(null); 
  return (
    <>
    <Analytics/>
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