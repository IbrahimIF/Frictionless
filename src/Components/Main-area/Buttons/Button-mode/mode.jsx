import React, { useContext, useEffect } from "react";
import {ThemeContext} from "../../../Context/SavedChanges";

import './mode.css';
import '../../../../Darkmode.css';

/*FontAwesomeIcon imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';

function mode() {

  // Theme context
  const { isDarkMode, setIsDarkMode, setActiveMode} = useContext(ThemeContext);
  // setActiveMode used to save what mode is set so other parts of the system know.
  const [activeButton, setActiveButton] = React.useState(null); // State to track the active button

    // Toggle dark mode
    useEffect(() => {
      document.body.classList.toggle("dark-mode", isDarkMode);
    }, [isDarkMode]);

    const icons = isDarkMode ? faMoon : faSun; /*change dark-mode or light-mode logo when pressed */
    const style = isDarkMode ? "Moon" : "Sun"; /*change dark-mode or light-mode logo when pressed */

    // handleButtonClick is used so the buttons below become a toggle, 
    // only one button can be toggle at a time.
    const handleButtonClick = (buttonName) => {
      // If the clicked button is already active, deactivate it
    if (activeButton === buttonName) {
      setActiveButton(null);
      setActiveMode(null); 
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
