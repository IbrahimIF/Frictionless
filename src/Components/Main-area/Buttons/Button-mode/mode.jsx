import './mode.css';
import '../../../../Darkmode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';


import ThemeContext from "../../../Contexts/ThemeContext";
import React, { useContext, useEffect } from "react";

function mode() {

  // Theme context
  const { isDarkMode, setIsDarkMode, activeMode, setActiveMode } = useContext(ThemeContext);
  const [activeButton, setActiveButton] = React.useState(null); // State to track the active button



    // Toggle dark mode
    useEffect(() => {
      document.body.classList.toggle("dark-mode", isDarkMode);
    }, [isDarkMode]);

    const icons = isDarkMode ? faMoon : faSun;
    const style = isDarkMode ? "Moon" : "Sun";

    const handleButtonClick = (buttonName) => {
      // If the clicked button is already active, deactivate it
    if (activeButton === buttonName) {
      setActiveButton(null);
      setActiveMode(null); // Assuming null represents the absence of a mode
    } else {
      // Otherwise, activate the clicked button
      setActiveButton(buttonName);
      setActiveMode(buttonName);
    }
    };

  return (
    <>
      <div className="buttonTopArea">
        <div className="buttonModeArea">
          <a className={`buttonMode ${activeButton === "Analyse" ? "active" : ""}`} id="btnAnalyse" onClick={() => handleButtonClick("Analyse")}><span className="texts"> Analyse </span></a>
          <a className={`buttonMode ${activeButton === "Detect" ? "active" : ""}`} id="btnDetect" onClick={() => handleButtonClick("Detect")}><span className="texts"> Detect </span></a>
          <a className={`buttonMode ${activeButton === "Improve" ? "active" : ""}`} id="btnImprove" onClick={() => handleButtonClick("Improve")}><span className="texts"> Improve </span></a>
        </div>
      
        <div className={`container-dark ${isDarkMode ? 'dark-mode' : ''}`}>
          <input id="checkbox" type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} className="darkmode" />
            <label className="darkMode" htmlFor="checkbox">
              <FontAwesomeIcon icon={icons} className={style} />
            </label>
        </div>
      </div>
    </>
  )
}

export default mode
