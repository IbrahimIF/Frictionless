
import './extra.css'
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faCaretDown } from '@fortawesome/free-solid-svg-icons';

function extra() {
// Theme context
const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
const [selectedTheme, setSelectedTheme] = useState('Choose Theme');

const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

const toggleLanguageDropdown = () => setLanguageDropdownOpen(!languageDropdownOpen);
const toggleThemeDropdown = () => setThemeDropdownOpen(!themeDropdownOpen);


  return (
    <>
<div className="buttonBottomArea">
  <button className="button">Clear All <FontAwesomeIcon icon= {faXmark} /></button>
  
  <button className="button" onClick={toggleLanguageDropdown}>{selectedLanguage} <FontAwesomeIcon icon= {faCaretDown} />
  {languageDropdownOpen && (
    <div className="dropdown-content" style={{ display: languageDropdownOpen ? 'flex' : 'none' }}>
      <button className="dropdown" onClick={() => setSelectedLanguage('Javascript')}>Javascript</button>
      <button className="dropdown" onClick={() => setSelectedLanguage('Java')}>Java</button>
      <button className="dropdown" onClick={() => setSelectedLanguage('Typescript')}>Typescript</button>
      <button className="dropdown" onClick={() => setSelectedLanguage('Python')}>Python</button>
      <button className="dropdown" onClick={() => setSelectedLanguage('C#')}>C#</button>
      <button className="dropdown" onClick={() => setSelectedLanguage('C++')}>C++</button>
    </div>
    )}
  </button>


  <button className="button" onClick={toggleThemeDropdown}>{selectedTheme} <FontAwesomeIcon icon= {faCaretDown} />
  {themeDropdownOpen && (
    <div className="dropdown-content" style={{ display: themeDropdownOpen ? 'flex' : 'none' }}>
      <button className="dropdown" onClick={() => setSelectedTheme('Dracular Official')}>Draculat Official</button>
      <button className="dropdown" onClick={() => setSelectedTheme('One Dark Pro')}>One Dark Pro</button>
      <button className="dropdown" onClick={() => setSelectedTheme('Cobalt2')}>Cobalt2</button>
      <button className="dropdown" onClick={() => setSelectedTheme('Night Owl')}>Night Owl</button>
      <button className="dropdown" onClick={() => setSelectedTheme('Atom One Dark')}>Atom One Dark</button>
      <button className="dropdown" onClick={() => setSelectedTheme('GithubTheme')}>GithubTheme</button>
    </div>
    )}
  </button>
  <button className="check-button"><span>check</span><span>done</span></button>
</div>
    </>
  )
}

export default extra