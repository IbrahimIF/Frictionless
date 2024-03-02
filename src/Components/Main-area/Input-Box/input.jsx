
import "./Input.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
import ThemeContext from "../../Contexts/ThemeContext";
/* icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

/*langauages*/ 
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
/* themes */
import '@uiw/codemirror-themes-all';
import { abyss, androidstudio, andromeda, aura, bespin, copilot,githubLight, githubDark, monokaiDimmed, red, solarizedDark, tomorrowNightBlue, vscodeDark } from "@uiw/codemirror-themes-all";




function input() {
  const { codeTheme, codeLanguage, isDarkMode, clearCodeTrigger, codeValue, setCodeValue } = useContext(ThemeContext);
  const [code, setCode] = useState("type here (${codeLanguage})");
  const [isCodeTyped, setIsCodeTyped] = useState(false);

  const codeMirrorRef = useRef(null);

  // Function to determine the correct extension based on selected language
  const getLanguageExtension = (language) => {
    switch(language) {
      case 'Javascript': return javascript();
      case 'Python': return python();
      case 'Java': return java();
      case 'HTML': return html();
      // Add other cases as needed
      default: return javascript(); // Default case
    }
  };

  // Function to determine the correct theme based on selection
  const getTheme = (themeName) => {
    switch(themeName) {
      case 'Abyss': return abyss;
      case 'Android Studio': return androidstudio;
      case 'Andomeda': return andromeda;
      case 'Aura': return aura;
      case 'Bespin': return bespin;
      case 'Copilot': return copilot;
      case 'Github Light': return githubLight;
      case 'Github Dark': return githubDark;
      case 'Monokai Dimmed': return monokaiDimmed;
      case 'Red': return red;
      case 'Solarized Dark': return solarizedDark;
      case 'Tomorrow Night Blue': return tomorrowNightBlue;
      case 'Vscode Dark': return vscodeDark;
      // Add cases for other themes
      default: return isDarkMode ? githubDark : githubLight; // Default theme
    }
  };


  useEffect(() => {  // Update the initial value whenever the selected language changes
    setCode(`type here (${codeLanguage})`);
    setIsCodeTyped(false);
  }, [codeLanguage]);

  useEffect(() => {
    // Respond to the clear code trigger
    setCode(`type here (${codeLanguage})`);
    setIsCodeTyped(false);
  }, [clearCodeTrigger, codeLanguage]);

  useEffect(() => {
    // Update codeValue in the context whenever code changes
    setCodeValue(code);
  }, [code, setCodeValue]);


  const handlePasteButtonClick = () => {
    navigator.clipboard.readText().then((clipboardData) => {
      // Update CodeMirror value with clipboard data
      setCode(clipboardData);
      setIsCodeTyped(true);
    });
  };

  return (
    <>
<div className="input-box">
<CodeMirror
      ref={codeMirrorRef}
      value={code}
      className="CodeMirror"
      extensions={[getLanguageExtension(codeLanguage)]}
      theme={getTheme(codeTheme)}
      onChange={(value, viewUpdate) => {
        setCode(value);
        setIsCodeTyped(value !== `type here (${codeLanguage})`);
        console.log('value:', value);
      }}
    />
    {!isCodeTyped && (
    <button className="paste" onClick={handlePasteButtonClick}><span><FontAwesomeIcon className="icon" icon= {faClipboard} /> <br/><br/> paste code</span> <span>done</span></button>
    )}
    </div>
    </>
  )
}

export default input