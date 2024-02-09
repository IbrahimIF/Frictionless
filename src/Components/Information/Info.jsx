


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
      <div className="infoArea">
        <div className="titleArea">
          <h2 className="Title">Analyse</h2>
          <h2 className="Title">Detect</h2>
          <h2 className="Title">Improve</h2>
        </div>
        <div className="titleArea">
          <p className="texts">A text with a text inside a text, more simplified words,<br />and more text</p>
        </div>
        <div className="cardArea">
          <div className="card">
            <div className="main-content">
              <p className="text">tedtddnwjnd</p>
            </div>
            <div className="second-content">
              <div className="test" style={{backgroundPosition: "center 40%", borderRadius: "0.375rem", backgroundSize: "cover", height: "100px", zIndex: "5"}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default mode