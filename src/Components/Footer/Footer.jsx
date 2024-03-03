import React, { useState } from 'react';
import './footer.css';


function Footer({descriptionSectionRef}) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);

    if (!checked) {
      // If the button is checked (scrolling down)
      if (descriptionSectionRef.current) {
        descriptionSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If the button is unchecked (scrolling up)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className= "footer" >
        <div className="footer-button-container">
          <label className="footer-button">
            <input 
              type="checkbox" 
              checked={checked} 
              onChange={handleCheck}
            />
            <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="chevron-down">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
            </svg>
          </label>
        </div>
      </div>
    </>
  );
}

export default Footer;