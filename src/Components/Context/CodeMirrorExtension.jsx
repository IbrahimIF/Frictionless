// CodeMirrorContext.js
import React, { useContext, useState, useEffect} from "react";
import {ThemeContext} from "./SavedChanges";

import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { csharp } from '@replit/codemirror-lang-csharp';
import { rust } from '@codemirror/lang-rust';

/* themes */
import '@uiw/codemirror-themes-all';
import { abyss, androidstudio, andromeda, aura, bespin, copilot, githubLight, githubDark, monokaiDimmed, red, solarizedDark, tomorrowNightBlue, vscodeDark } from "@uiw/codemirror-themes-all";

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
      }
    };
  
    const getLanguageExtension = (language) => {
      switch (language) {
        case 'Javascript': return javascript();
        case 'Python': return python();
        case 'Java': return java();
        case 'HTML': return html();
        case 'C#': return csharp();
        case 'Rust': return rust();
        default: return javascript();
      }
    };
  
    return {
      getTheme,
      getLanguageExtension,
    };
  };


