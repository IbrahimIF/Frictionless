
import './mode.css';
import '../../../../Darkmode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function mode() {


  return (
    <>
<div className="buttonTopArea">
<div className="buttonModeArea">
<a className="buttonMode"><span class="texts"> Analyse </span></a>
<a className="buttonMode"><span class="texts"> Detect </span></a>
<a className="buttonMode"><span class="texts"> Improve </span></a>
</div>

<div>
<a className="darkMode"><FontAwesomeIcon icon="fa-regular fa-moon" /></a>
</div>


</div>
    </>
  )
}

export default mode