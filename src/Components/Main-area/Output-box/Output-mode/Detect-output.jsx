import '../output.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
import {ThemeContext} from "../../../Context/SavedChanges";
import { useCodeMirrorContext } from '../../../Context/CodeMirrorExtension';


function detect() {
  const { codeTheme, codeLanguage, isDarkMode, codeValue, clearCodeTrigger, setCodeValue, updateTrigger } = useContext(ThemeContext);
  const codeMirrorRef = useRef(null);
  const [updatedCodeValue, setUpdatedCodeValue] = useState("");
  const { getTheme, getLanguageExtension } = useCodeMirrorContext();

  
  useEffect(() => {
    // Respond to the clear code trigger
    setCodeValue(codeValue);
  }, [clearCodeTrigger]);



  
  const syntaxCheck = (code, language) => {
    const errors = [];
    let inBlockComment = false;
    const lines = code.split('\n');

  const addError = (lineNumber, message, suggestion) => {
    errors.push({ line: lineNumber, message, suggestion });
  };

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    let trimmedLine = line.trim();
    if (trimmedLine.startsWith('/*')) inBlockComment = true;
    if (trimmedLine.endsWith('*/')) {
      inBlockComment = false;
      return; // Exit current iteration
    }
    if (inBlockComment || trimmedLine.startsWith('//') || trimmedLine === "") return; // Skip comments or empty lines


    if (line.includes('(') && !line.includes(')')) {
      addError(lineNumber, "Unmatched opening parenthesis.", "Ensure every opening parenthesis '(' has a closing parenthesis ')'.");
    }

    // Consolidating JavaScript and TypeScript checks due to similarity
    if (['JavaScript', 'TypeScript'].includes(language)) {
      if (!line.trim().endsWith(';') && !line.trim().endsWith('}') && !line.trim().endsWith('{') && line.trim() !== "" && !line.trim().startsWith('for') && !line.trim().startsWith('if') && !line.trim().startsWith('while') && !line.trim().startsWith('function') && !line.trim().startsWith('//')) {
        addError(lineNumber, "Possible missing semicolon.", "Consider adding a semicolon ';' at the end of the statement.");
      }
    } else if (language === 'Python') {
      if (!/^(\s{4})*\S/.test(line) && line.trim() !== "") {
        addError(lineNumber, "Line not indented correctly.", "Use multiples of 4 spaces for indentation.");
      }
      if (/\b(def|class)\S/.test(line)) {
        addError(lineNumber, "'def' or 'class' should be followed by a space.", "Add a space between 'def' or 'class' and the name.");
      }
    } else if (language === 'Java') {
      // Check for class declarations missing access modifiers
      if (/\bclass\b/.test(trimmedLine) && !/\b(public|protected|private)\b/.test(trimmedLine)) {
        addError(lineNumber, "Class declaration missing access modifier.", "Precede the class name with 'public', 'protected', or 'private'.");
      }
      
      // Refine semicolon check excluding cases where semicolons are not expected
      const endsWithControlSymbols = ['{', '}', ';'].some(symbol => trimmedLine.endsWith(symbol));
      const startsWithKeywords = ['if', 'for', 'while', 'do', '}', 'import', 'package'].some(keyword => trimmedLine.startsWith(keyword));
      const containsClassOrInterface = ['class', 'interface'].some(keyword => trimmedLine.includes(keyword));

      if (!endsWithControlSymbols && !startsWithKeywords && !containsClassOrInterface && trimmedLine !== "") {
        addError(lineNumber, "Possible missing semicolon.", "Add a semicolon ';' at the end of the statement.");
      }
    } else if (language === 'HTML') {
      // Basic HTML check for unmatched tags
      if (line.includes('<') && !line.includes('>')) {
        addError(lineNumber, "Unmatched tag detected.", "Ensure each opening tag '<tag>' has a closing tag '</tag>'.");
      }
    } else if (language === 'C#') {
      // C# specific syntax checks
      if (/\bclass\b/.test(line) && !/\b(public|private|protected|internal|protected internal|private protected)\b/.test(line)) {
        addError(lineNumber, "Class declaration missing access modifier.", "Classes should declare an access level by preceding with 'public', 'private', etc.");
      }
      if (!line.trim().endsWith(';') && !line.trim().endsWith('}') && !line.trim().endsWith('{') && !line.trim().endsWith(']') && line.trim() !== "" && !line.trim().startsWith('//') && !line.trim().startsWith('/*')) {
        addError(lineNumber, "Possible missing semicolon.", "C# statements should end with a semicolon ';'.");
      }
      // Add more C# specific checks as needed
    } else if (language === 'Rust') {
      // Rust specific syntax checks
      if (!line.trim().endsWith(';') && !line.trim().endsWith('}') && !line.trim().endsWith('{') && !line.trim().endsWith(']') && line.trim() !== "" && !line.trim().endsWith('>') && !line.trim().startsWith('//') && !line.includes("fn ") && !line.includes("struct ") && !line.includes("enum ")) {
        addError(lineNumber, "Possible missing semicolon.", "Rust statements outside of control blocks should end with a semicolon ';'.");
      }
      if (line.includes("fn") && !line.includes("(")) {
        addError(lineNumber, "Function declaration syntax error.", "Ensure function declarations include parentheses '()'.");
      }
      // Add more Rust specific checks as needed
    }
  });
 
    return errors;
  };
  
  useEffect(() => {
    const errors = syntaxCheck(codeValue, codeLanguage);
  let errorDisplayContent = errors.length > 0 
    ? errors.map(err => `Line ${err.line}: ${err.message} Suggestion: ${err.suggestion}`).join('\n') 
    : "No syntax errors detected.";
    
    const detectCodeContent = `
      # ---- Error display ---- #
      ${errorDisplayContent}
    `;
    setUpdatedCodeValue(detectCodeContent);
  }, [codeValue, codeLanguage]);

  
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
        setCode(value);
        console.log('value:', value);
      }}
    />
</div>
    </>
  )
}

export default detect