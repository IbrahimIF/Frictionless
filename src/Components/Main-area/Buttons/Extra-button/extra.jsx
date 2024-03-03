
import './extra.css'
import ThemeContext from '../../../Contexts/ThemeContext';
import { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faCaretDown } from '@fortawesome/free-solid-svg-icons';

function extra({ onClick }) {
// Theme context
const { codeLanguage, codeTheme, setCodeTheme, setCodeLanguage, clearCode, updateCode } = useContext(ThemeContext);

const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

const toggleLanguageDropdown = () => setLanguageDropdownOpen(!languageDropdownOpen);
const toggleThemeDropdown = () => setThemeDropdownOpen(!themeDropdownOpen);


  return (
    <>
<div className="buttonBottomArea">
  <button className="button" onClick={clearCode} >Clear All <FontAwesomeIcon icon= {faXmark} /></button>
  
  <button className="button" onClick={toggleLanguageDropdown}>{codeLanguage} <FontAwesomeIcon icon= {faCaretDown} />
  {languageDropdownOpen && (
    <div className="dropdown-content" style={{ display: languageDropdownOpen ? 'flex' : 'none' }}>
      <button className="dropdown" onClick={() => setCodeLanguage('Default Language')}>Default Language</button>
      <button className="dropdown" onClick={() => setCodeLanguage('Javascript')}>Javascript</button>
      <button className="dropdown" onClick={() => setCodeLanguage('Java')}>Java</button>
      <button className="dropdown" onClick={() => setCodeLanguage('HTML')}>HTML</button>
      <button className="dropdown" onClick={() => setCodeLanguage('Python')}>Python</button>
      <button className="dropdown" onClick={() => setCodeLanguage('C#')}>C#</button>
      <button className="dropdown" onClick={() => setCodeLanguage('Rust')}>Rust</button>
    </div>
    )}
  </button>


  <button className="button" onClick={toggleThemeDropdown}>{codeTheme} <FontAwesomeIcon icon= {faCaretDown} />
  {themeDropdownOpen && (
    <div className="dropdown-content" style={{ display: themeDropdownOpen ? 'flex' : 'none' }}>
      <button className="dropdown" onClick={() => setCodeTheme('Default Theme')}>Default Theme</button>
      <button className="dropdown" onClick={() => setCodeTheme('Abyss')}>Abyss</button>
      <button className="dropdown" onClick={() => setCodeTheme('Android Studio')}>Android Stuido</button>
      <button className="dropdown" onClick={() => setCodeTheme('Andromeda')}>Andromeda</button>
      <button className="dropdown" onClick={() => setCodeTheme('Aura')}>Aura</button>
      <button className="dropdown" onClick={() => setCodeTheme('Bespin')}>Bespin</button>
      <button className="dropdown" onClick={() => setCodeTheme('Copilot')}>Copilot</button>
      <button className="dropdown" onClick={() => setCodeTheme('Github Light')}>Light</button>
      <button className="dropdown" onClick={() => setCodeTheme('Github Dark')}>Dark</button>
      <button className="dropdown" onClick={() => setCodeTheme('Monokai Dimmed')}>Monokai Dimmed</button>
      <button className="dropdown" onClick={() => setCodeTheme('Red')}>Red</button>
      <button className="dropdown" onClick={() => setCodeTheme('Solarized Dark')}>Solarized Dark</button>
      <button className="dropdown" onClick={() => setCodeTheme('Tomorrow Night Blue')}>Tomorrow Night Blue</button>
      <button className="dropdown" onClick={() => setCodeTheme('Vscode Dark')}>Vscode Dark</button>
    </div>
    )}
  </button>
  <button className="check-button"  onClick={updateCode} ><span>check</span><span>done</span></button>
</div>
    </>
  )
}

export default extra