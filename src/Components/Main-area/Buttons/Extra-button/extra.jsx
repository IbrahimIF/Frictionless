
import './extra.css'
import ThemeContext from '../../../Contexts/ThemeContext';
import { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faCaretDown } from '@fortawesome/free-solid-svg-icons';

function extra() {
// Theme context
const { codeLanguage, codeTheme, setCodeTheme, setCodeLanguage } = useContext(ThemeContext);
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
  
  <button className="button" onClick={toggleLanguageDropdown}>{codeLanguage} <FontAwesomeIcon icon= {faCaretDown} />
  {languageDropdownOpen && (
    <div className="dropdown-content" style={{ display: languageDropdownOpen ? 'flex' : 'none' }}>
      <button className="dropdown" onClick={() => setCodeLanguage('Javascript')}>Javascript</button>
      <button className="dropdown" onClick={() => setCodeLanguage('Java')}>Java</button>
      <button className="dropdown" onClick={() => setCodeLanguage('HTML')}>HTML</button>
      <button className="dropdown" onClick={() => setCodeLanguage('Python')}>Python</button>
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