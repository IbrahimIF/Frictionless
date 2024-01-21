
import './banner.css'
import React, { useContext } from 'react';
import ThemeContext from "../Contexts/ThemeContext";

 import LightLogo from '../../assets/Images/Frictionless Logo light.png';
 import DarkLogo from '../../assets/Images/Frictionless Logo dark.png';
function Banner() {
  const { isDarkMode, setIsDarkMode} = useContext(ThemeContext);


  return (
    <>
<div className="banner" >
<img src={isDarkMode ? DarkLogo : LightLogo} className="bannersize" alt="Logo" />
</div>
    </>
  )
}

export default Banner