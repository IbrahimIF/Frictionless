
import './App.css'
import Banner from './Components/Banner/banner';

import Topbuttons from './Components/Main-area/Buttons/Button-mode/mode';
import Input from './Components/Main-area/Input-Box/input';
import Output from './Components/Main-area/Output-box/output';
import Bellowbuttons from './Components/Main-area/Buttons/Extra-button/extra';

import Footer from './Components/Footer/Footer';


function App() {


  return (
    <>
<div className="main-container">
  <div className="banner-container"> <Banner /> </div>
  <div className="middle-container">
    <Topbuttons />
    <Input />
    <Output />
    <Bellowbuttons />
  </div>
  <div className="footer-container"> <Footer /> </div>
</div>
    </>
  )
}

export default App
