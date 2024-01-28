


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
      <h2>Description Sections</h2>
      <div className="g">
    <div>bla</div>
</div>
{/* Add content for the description section here */}
<div><span>text</span><span /></div>
      </div>
    </>
  )
}

export default mode