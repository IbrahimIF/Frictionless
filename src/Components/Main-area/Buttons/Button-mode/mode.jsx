
import './mode.css';
import '../../../../Darkmode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';


import ThemeContext from "../../../Contexts/ThemeContext";
import { useContext, useEffect } from "react";

function mode() {

  // Theme context
  const { isDarkMode, setIsDarkMode} = useContext(ThemeContext);


    // Toggle dark mode
    useEffect(() => {
      document.body.classList.toggle("dark-mode", isDarkMode);
    }, [isDarkMode]);

    const icons = isDarkMode ? faMoon : faSun;
    const style = isDarkMode ? "Moon" : "Sun";
  return (
    <>
      <div className="buttonTopArea">
        <div className="buttonModeArea">
          <a className="buttonMode"><span className="texts"> Analyse </span></a>
          <a className="buttonMode"><span className="texts"> Detect </span></a>
          <a className="buttonMode"><span className="texts"> Improve </span></a>
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