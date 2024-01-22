
import './extra.css'
import '../../../../Darkmode.css';
import { useContext, useEffect } from "react";
import ThemeContext from "../../../Contexts/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function extra() {
// Theme context
const { isDarkMode, setIsDarkMode} = useContext(ThemeContext);



  return (
    <>
<div className="buttonBottomArea">
<button className="button">Clear All <FontAwesomeIcon icon= {faXmark} /></button>
<button className="button">Choose Language</button>
<button className="button">Choose Theme</button>
<button className="check-button">Check</button>
</div>
    </>
  )
}

export default extra