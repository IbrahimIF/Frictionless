import React, { useContext } from "react";
import {ThemeContext} from "./SavedChanges";

/*Codemirror Imports for the different languages */
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { csharp } from '@replit/codemirror-lang-csharp';
import { rust } from '@codemirror/lang-rust';

/* Codemirror imports for the different IDE themes */
import '@uiw/codemirror-themes-all';
import { abyss, androidstudio, andromeda, aura, bespin, copilot, githubLight, githubDark, monokaiDimmed, red, solarizedDark, tomorrowNightBlue, vscodeDark } from "@uiw/codemirror-themes-all";

/*All in one file for the use of being called in all the different modes, 
keeping clean code and easy to change or make additions*/
export const useCodeMirrorContext = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const getTheme = (themeName) => {
    switch (themeName) {
      case 'Abyss': return abyss;
      case 'Android Studio': return androidstudio;
      case 'Andromeda': return andromeda;
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
      default: return isDarkMode ? githubDark : githubLight;
      /*when no theme is picked on default there will be light and dark mode themes depending on what mode is set */
    }
  };
  
  const getLanguageExtension = (language) => {
    switch (language) {
      case 'Javascript': return javascript();
      case 'Typescript': return javascript();
      case 'JSX': return javascript();
      case 'Python': return python();
      case 'Java': return java();
      case 'HTML': return html();
      case 'C#': return csharp();
      case 'Rust': return rust();
      default: return javascript();
      /*when no Language is chosen it will automatically pick javascript as default */
    }
  };
  
  return {
    getTheme,
    getLanguageExtension,
  };
};


