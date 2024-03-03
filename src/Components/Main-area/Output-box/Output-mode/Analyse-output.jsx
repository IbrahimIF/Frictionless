import '../output.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
import {ThemeContext} from "../../../Context/SavedChanges";
import { useCodeMirrorContext } from '../../../Context/CodeMirrorExtension';

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


function analyse() {
  const { codeTheme, codeLanguage, isDarkMode, setCodeValue, codeValue, updateTrigger } = useContext(ThemeContext);
  const [updatedCodeValue, setUpdatedCodeValue] = useState("");
  const { getTheme, getLanguageExtension } = useCodeMirrorContext();
  const codeMirrorRef = useRef(null);


    useEffect(() => {
      // Respond to the updated code trigger
      setUpdatedCodeValue(codeValue);
    }, [updateTrigger]);


    /*# ---- Main ---- #*/

    const IndentationLevel = () => {
      const lines = updatedCodeValue.split('\n');
      const indentationLevels = lines.map((line) => {
        const leadingWhitespace = line.match(/^\s*/)[0];
        return leadingWhitespace.length;
      });
      return indentationLevels;
    };

    const listVariableANDtype = () => {
      const variableTypeRegex = /\b(var|let|const)\s+([\w$]+)\s*:\s*([\w$<>]+)/g;
      const matches = [...updatedCodeValue.matchAll(variableTypeRegex)];
    
      if (matches.length > 0) {
        // Mapping to return an array of objects with variable names and types
        return matches.map((match) => {
          const [, declarationType, variableName, variableType] = match;
          return { variableName, variableType };
        });
      } else {
        return [];
      }
    };

    /*# ---- Counts ---- #*/

    const lineCount = () => {
      return updatedCodeValue.split('\n').length;
    };

    const characterCount = () => {
      return updatedCodeValue.length;
    };

    const commentCount = () => {
      const commentRegex = /\/\/.*|\/\*[\s\S]*?\*\//g;
      const comments = updatedCodeValue.match(commentRegex);
      return comments ? comments.length : 0;
    };

    const controlStructureCount = () => {
      const controlStructureRegex = /\b(?:if|else|for|while|switch)\b[^]*?(\n\s*|$)/g;
      const controlStructures = updatedCodeValue.match(controlStructureRegex);
      return controlStructures ? controlStructures.length : 0;
    };

    const FunctionandMethodCount = () => {
      const functionMethodRegex = /\bfunction\b\s+[\w$]+\s*\(/g;
      const functionsMethods = updatedCodeValue.match(functionMethodRegex);
      return functionsMethods ? functionsMethods.length : 0;
    };
  
    const errorHandlingCount = () => {
      const tryCatchRegex = /\btry\b|\bcatch\b/g;
      const tryCatchBlocks = updatedCodeValue.match(tryCatchRegex);
      return tryCatchBlocks ? tryCatchBlocks.length : 0;
    };
  
    const APIcallsCount = () => {
      const apiCallRegex = /\b(fetch|axios|http)\(/g;
      const apiCalls = updatedCodeValue.match(apiCallRegex);
      return apiCalls ? apiCalls.length : 0;
    };

    /*# ---- Cyclomatic Complexity  ---- #*/


  const decisionPointRegex = /\bif\b|\belse\b|\bfor\b|\bwhile\b|\bcase\b|\bcatch\b|\b&&\b|\b\|\|\b/g;
  const decisionPoints = updatedCodeValue.match(decisionPointRegex);
  const nodes = updatedCodeValue.split('\n').filter(line => line.trim() !== '').length - (decisionPoints ? decisionPoints.length : 0);
  const connectedComponents = 1;

  const cyclomaticComplexity = () => {
  // Calculate Cyclomatic Complexity
  const complexity =  (decisionPoints ? decisionPoints.length : 0) - nodes + 2 * connectedComponents;
  return Math.max(0, complexity); // Ensure complexity is non-negative
  };


  const variablesList = listVariableANDtype();

  // Combine the content for AnalyseCode
  const analyseCodeContent = `
  # ---- Main ---- #
  Programming Language: ${codeLanguage ? codeLanguage : 'Unknown'}
  Theme: ${codeTheme ? codeTheme : 'Uknown'}
  ${IndentationLevel().length > 0 ? `Indentation Level: ${IndentationLevel().join(', ')}` : ''}
  ${variablesList.length > 0 ? `List of Variable Name and:\n${variablesList.map((variable, index) => `${index + 1}. ${variable.variableName}: ${variable.variableType}`).join('\n')}` : ''}
  

  # ---- Counts ---- #
  Line Count: ${lineCount()}
  character Count: ${characterCount()}
  Control Structure Count: ${controlStructureCount()} # if statments, loops etc.
  ${commentCount() > 0 ? `Comment Count: ${commentCount()}` : ''}
  ${FunctionandMethodCount() > 0 ? `Function and Method Count: ${FunctionandMethodCount()}` : ''}
  ${errorHandlingCount() > 0 ? `Error Handling Count: ${errorHandlingCount()}` : ''}
  ${APIcallsCount() > 0 ? `API Calls Count: ${APIcallsCount()}` : ''}


  # ---- Cyclomatic Complexity ---- #
  Cyclomatic Complexity: ${cyclomaticComplexity()}
  Decision Points: ${decisionPoints}
  Nodes: ${nodes}
  Connected Components: ${connectedComponents}
  `;

  return (
    <>
<div className="output-box">
<CodeMirror
      ref={codeMirrorRef}
      value={analyseCodeContent}
      className="CodeMirror"
      extensions={[getLanguageExtension(codeLanguage)]}
      theme={getTheme(codeTheme)}
      readOnly={true}
      onChange={(value, viewUpdate) => {
        setCode(value);
        console.log('value:', value);
      }}
    />
</div>
    </>
  )
}

export default analyse