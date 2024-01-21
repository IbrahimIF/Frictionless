
import './mode.css';
import '../../../../Darkmode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';

import ThemeContext from "../../../Contexts/ThemeContext";
import { useContext, useEffect } from "react";

function mode() {

  // Theme context
  const { isDarkMode, setIsDarkMode} = useContext(ThemeContext);
  const moon = faMoon
  const icons = String;

    // Toggle dark mode
    useEffect(() => {
      document.body.classList.toggle("dark-mode", isDarkMode);
    }, [isDarkMode]);

    {isDarkMode ? 'icons = moon' : 'icons = moon'}

  return (
    <>
      <div className="buttonTopArea">
        <div className="buttonModeArea">
          <a className="buttonMode"><span class="texts"> Analyse </span></a>
          <a className="buttonMode"><span class="texts"> Detect </span></a>
          <a className="buttonMode"><span class="texts"> Improve </span></a>
        </div>
      
        <div className={`container-dark ${isDarkMode ? 'dark-mode' : ''}`}>
          <input id="checkbox" type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} className="darkmode" />
            <label className="darkMode" htmlFor="checkbox">
              <FontAwesomeIcon icon={icons} />
            </label>
        </div>
      </div>
    </>
  )
}

export default mode