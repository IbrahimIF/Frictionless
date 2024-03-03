import '../output.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
import ThemeContext from "../../../Contexts/ThemeContext";


/*langauages*/ 
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { csharp } from '@replit/codemirror-lang-csharp'
import { rust } from '@codemirror/lang-rust'

/* themes */
import '@uiw/codemirror-themes-all';
import { abyss, androidstudio, andromeda, aura, bespin, copilot,githubLight, githubDark, monokaiDimmed, red, solarizedDark, tomorrowNightBlue, vscodeDark } from "@uiw/codemirror-themes-all";


function improve() {
  const { codeTheme, codeLanguage, isDarkMode, codeValue, updateTrigger  } = useContext(ThemeContext);
  const codeMirrorRef = useRef(null);
  const [updatedCodeValue, setUpdatedCodeValue] = useState("");

    // Function to determine the correct extension based on selected language
    const getLanguageExtension = (language) => {
      switch(language) {
        case 'Javascript': return javascript();
        case 'Python': return python();
        case 'Java': return java();
        case 'HTML': return html();
        case 'C#': return csharp();
        case 'Rust': return rust();
        
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


    useEffect(() => {
      // Respond to the updated code trigger
      setUpdatedCodeValue(codeValue);
    }, [updateTrigger]);

  return (
    <>
<div className="output-box">
<CodeMirror
      ref={codeMirrorRef}
      value={updatedCodeValue}
      className="CodeMirror"
      extensions={[getLanguageExtension(codeLanguage)]}
      theme={getTheme(codeTheme)}
      readOnly={true}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
      }}
    />
</div>
    </>
  )
}

export default improve