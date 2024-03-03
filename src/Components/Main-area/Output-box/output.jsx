import './output.css';
import '../../../Darkmode.css'

import {ThemeContext} from '../../Context/SavedChanges';
import React, { useContext, useEffect } from "react";

import Default from './Output-mode/Default-output';
import Analyse from './Output-mode/Analyse-output';
import Detect from './Output-mode/Detect-output';
import Improve from './Output-mode/Improve-output';


function output() {
    const { isDarkMode, setIsDarkMode, activeMode, setActiveMode } = useContext(ThemeContext);


    const renderMode = (activemode) => {
        switch (activeMode) {
          case "Analyse": return <Analyse />;
          case "Detect": return <Detect />;
          case "Improve": return <Improve />;
          default: return <Default />;
        }
      };

  return (
    <>
       {renderMode()}
    </>
  )
}

export default output
