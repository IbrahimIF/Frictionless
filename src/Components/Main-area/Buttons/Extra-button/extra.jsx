
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
<button class="button">Clear All <FontAwesomeIcon icon= {faXmark} /></button>
<button class="button">Choose Language</button>
<button class="button">Choose Theme</button>
<button class="check-button">Check</button>
</div>
    </>
  )
}

export default extra