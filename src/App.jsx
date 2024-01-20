
import './App.css'
import Banner from './Components/Banner/banner';

import MainArea from './Components/Main-area/main';

import Footer from './Components/Footer/Footer';


function App() {


  return (
    <>
<div className="main-container">
  <div className="banner-container"> <Banner /> </div>
  <div className="middle-container"> <MainArea /> </div>
  <div className="footer-container"> <Footer /> </div>
</div>
    </>
  )
}

export default App
