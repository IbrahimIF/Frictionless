import '../output.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
import {ThemeContext} from "../../../Context/SavedChanges";
import { useCodeMirrorContext } from '../../../Context/CodeMirrorExtension';
import axios from 'axios';
const backendURL = 'http://localhost:4000'; 


function analyse() {
  const { codeTheme, codeLanguage, isDarkMode, setCodeValue, codeValue, updateTrigger } = useContext(ThemeContext);
  const [updatedCodeValue, setUpdatedCodeValue] = useState("");
  const { getTheme, getLanguageExtension } = useCodeMirrorContext();
  const codeMirrorRef = useRef(null);

  const [regexPatterns, setRegexPatterns] = useState([]);

  
  useEffect(() => {
    // Fetch regex patterns from MongoDB
    const fetchRegexPatterns = async () => {
      try {
        console.log('Fetching regex patterns...'); // L
        const response = await axios.get('http://localhost:4000/AnalysisRegex'); // Update the endpoint accordingly
        setRegexPatterns(response.data);
        console.log('Regex patterns fetched successfully.');
      } catch (error) {
        console.error('Error fetching regex patterns:', error);
      }
    };

    fetchRegexPatterns();
  }, []);

   // Use regexPatterns in your component
   console.log('Regex Patterns:', regexPatterns);


    useEffect(() => {
      // Respond to the updated code trigger
      setUpdatedCodeValue(codeValue);
    }, [updateTrigger]);


    // Function to get regex pattern by name from regexPatterns
const getRegexPatternByName = (patternName) => {
  const patternObj = regexPatterns.find((pattern) => pattern.name === patternName);
  return patternObj ? new RegExp(patternObj.pattern, 'g') : null;
};

// Function to count occurrences based on a given regex pattern
const countOccurrences = (regexPattern) => {
  const matches = updatedCodeValue.match(regexPattern);
  return matches ? matches.length : 0;
};


    /*# ---- Main ---- #*/

    const IndentationLevel = () => {
      const lines = updatedCodeValue.split('\n');
  let maxIndentationLevel = 0; // To keep track of the highest level of indentation
  let totalIndentations = 0; // To count the total number of indentations

  lines.forEach((line) => {
    const leadingWhitespace = line.match(/^\s*/)[0].length;

    // Increment totalIndentations if the line is indented
    if (leadingWhitespace > 0) {
      totalIndentations++;
    }

    // Determine the level based on the count of leading whitespaces
    let currentLevel = 0;
    if (leadingWhitespace === 0) {
      currentLevel = 0;
    } else if (leadingWhitespace > 0 && leadingWhitespace <= 4) {
      currentLevel = 1;
    } else if (leadingWhitespace > 4 && leadingWhitespace <= 8) {
      currentLevel = 2;
    } else if (leadingWhitespace > 8 && leadingWhitespace <= 12) {
      currentLevel = 3;
    } else if (leadingWhitespace > 12 && leadingWhitespace <= 16) {
      currentLevel = 4;
    } else if (leadingWhitespace > 16 && leadingWhitespace < 25) {
      currentLevel = 5;
    } else {
      currentLevel = 5; // Consider any indentation greater than 16 as level 5
    }

    // Update maxIndentationLevel if the current line's indentation level is the highest so far
    if (currentLevel > maxIndentationLevel) {
      maxIndentationLevel = currentLevel;
    }
  });

  // Return a string representation of the highest indentation level and the total number of indentations
  return `Level ${maxIndentationLevel}: Highest indentation level detected with a total of ${totalIndentations/2} indentations.`;
    };

    const listVariableANDtype = () => {
      const variableTypeRegex = getRegexPatternByName('Variable Type');
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
      const commentRegex = getRegexPatternByName('Comment');
      const comments = updatedCodeValue.match(commentRegex);
      return comments ? comments.length : 0;
    };

    const controlStructureCount = () => {
      const controlStructureRegex = getRegexPatternByName('Control Structure');
      const controlStructures = updatedCodeValue.match(controlStructureRegex);
      return controlStructures ? controlStructures.length : 0;
    };

    const FunctionandMethodCount = () => {
      const functionMethodRegex = getRegexPatternByName('Function and Method');
      const functionsMethods = updatedCodeValue.match(functionMethodRegex);
      return functionsMethods ? functionsMethods.length : 0;
    };
  
    const errorHandlingCount = () => {
      const tryCatchRegex = getRegexPatternByName('Error Handling');
      const tryCatchBlocks = updatedCodeValue.match(tryCatchRegex);
      return tryCatchBlocks ? tryCatchBlocks.length : 0;
    };
  
    const APIcallsCount = () => {
      const apiCallRegex = getRegexPatternByName('API Call');
      const apiCalls = updatedCodeValue.match(apiCallRegex);
      return apiCalls ? apiCalls.length : 0;
    };

    /*# ---- Cyclomatic Complexity  ---- #*/

    const decisionPointRegex = getRegexPatternByName('Cyclomatic Complexity Decision Points');
const decisionPointsMatch = updatedCodeValue.match(decisionPointRegex);
const decisionPoints = decisionPointsMatch ? decisionPointsMatch.length : 0;
const allLines = updatedCodeValue.split('\n');
const nonEmptyLines = allLines.filter(line => line.trim() !== '');
// Edges are equal to the number of decision points since each introduces a new path
const edges = decisionPoints;
// Each coded line represents a node, including those that are decision points
const codedLines = nonEmptyLines.length;
// Nodes are simply the count of coded lines in this simplified approach
const nodes = codedLines;
const node = 3;
const connectedComponents = 1;
const cyclomaticComplexity = () => {
    // Correct calculation of Cyclomatic Complexity
    const complexity = edges - node + 2*1;
    return complexity; // Ensure complexity is non-negative
};


  const variablesList = listVariableANDtype();

  // Combine the content for AnalyseCode
  const analyseCodeContent = `
  # ---- Main ---- #
  Programming Language: ${codeLanguage ? codeLanguage : 'Unknown'}
  Theme: ${codeTheme ? codeTheme : 'Uknown'}
  Indentation Level: ${IndentationLevel()}
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