import React, { useContext } from "react";
import {ThemeContext} from '../../Context/SavedChanges';

import './output.css';
import '../../../Darkmode.css'

import Default from './Output-mode/Default-output';
import Analyse from './Output-mode/Analyse-output';
import Detect from './Output-mode/Detect-output';
import Improve from './Output-mode/Improve-output';


function output() {
    const { activeMode } = useContext(ThemeContext);

/*Output box that displays the different modes below */
/*using active mode to detect what mode is set*/
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
