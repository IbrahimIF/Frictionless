import React, { useContext } from "react";
import { ThemeContext } from "../Context/SavedChanges";

import './Info.css';
import '../../Darkmode.css';

import LeftCard from './Carousel-cards/Card-Left';
import CentralCard from './Carousel-cards/Card-Central';
import RightCard from './Carousel-cards/Card-Right';

/* Images */
import LightLogo from '../../assets/Images/Frictionless Logo light.png';
import DarkLogo from '../../assets/Images/Frictionless Logo dark.png';
import Cube from '../../assets/Images/3D Cube.png';


function info() {
const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <div className="infoArea">
        <div className="title"><img src={isDarkMode ? DarkLogo : LightLogo} className="titleSize" alt="Logo" /></div>
        <div className="textArea">
          <p className="textInfo">A Software tool thats there to provide assitance on understanding and improving your code,<br />and Support dedicated programmers</p>
        </div>
        <div className="belowArea">
          <div className="leftArea">
            <div className="leftCube"><img src={Cube} className="cubeSize" alt="3Dcube" /></div>
            <div className="sectionArea">
              <h1 className="textInfo">Analyse</h1>
              <LeftCard/>
            </div>
          </div>
          <div className="centralArea">
            <div className="centralCube"><img src={Cube} className="cubeSize" alt="3Dcube" /></div>
            <div className="sectionArea">
              <h1 className="textInfo">Detect</h1>
              <CentralCard/>
            </div>
          </div>
          <div className="rightArea">
            <div className="rightCube"><img src={Cube} className="cubeSize" alt="3Dcube" /></div>
            <div className="sectionArea">
              <h1 className="textInfo">Improve</h1>
              <RightCard/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default info