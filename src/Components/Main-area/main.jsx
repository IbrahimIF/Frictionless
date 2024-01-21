
import './main.css';
import '../../Darkmode.css'

import Themecontext from '../Contexts/ThemeContext';
import Topbuttons from './Buttons/Button-mode/mode';
import Input from './Input-Box/input';
import Output from './Output-box/output';
import Bellowbuttons from './Buttons/Extra-button/extra';

function main() {

  return (
    <>
<div className="mainArea">
  <div className="middleArea">
    <div className="topButtonsArea"><Topbuttons /></div>
  <Input />
  <Output />
  <div className="bellowButtonsArea"><Bellowbuttons /></div>
  </div>
</div>
    </>
  )
}

export default main