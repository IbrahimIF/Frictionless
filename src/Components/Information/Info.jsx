


import './Info.css';
import '../../Darkmode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ThemeContext from "../Contexts/ThemeContext";
import { useContext, useEffect } from "react";

function mode() {

  // Theme context
  const { isDarkMode, setIsDarkMode} = useContext(ThemeContext);
  


  return (
    <>
      <div className="InfoArea">
              <h2 className="Title">Analyse</h2>
              <h2 className="Title">Detect</h2>
              <h2 className="Title">Improve</h2>
      </div>
    </>
  )
}

export default mode