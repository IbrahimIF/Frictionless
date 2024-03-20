import React, { useContext } from 'react';
import {ThemeContext} from "../Context/SavedChanges";

import './banner.css'

/*different logos for both dark-mode and light-mode */
import LightLogo from '../../assets/Images/Frictionless Logo light.png';
import DarkLogo from '../../assets/Images/Frictionless Logo dark.png';
function Banner() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <div className="banner" >
        <img src={isDarkMode ? DarkLogo : LightLogo} className="bannersize" alt="Logo" />
      </div>
    </>
  )
}

export default Banner