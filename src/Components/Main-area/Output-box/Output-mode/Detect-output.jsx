import React, { useState, useEffect, useRef, useContext } from "react";
import {ThemeContext} from "../../../Context/SavedChanges";

import CodeMirror  from '@uiw/react-codemirror';
import { useCodeMirrorContext } from '../../../Context/CodeMirrorExtension';

import '../output.css'

function detect() {
  const { codeTheme, codeLanguage, codeValue, clearCodeTrigger, setCodeValue } = useContext(ThemeContext);
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

    const brackets = {
      '(': ')',
      '{': '}',
      '[': ']',
    };
    const openBrackets = Object.keys(brackets);
    const closeBrackets = Object.values(brackets);
    let stack = []; // variable stack is made to track open brackets

    const addError = (lineNumber, message, suggestion) => {
      errors.push({ line: lineNumber, message, suggestion });
    };


    lines.forEach((line, index) => {
    // Similar initial checks as before

      for (let char of line) {
        if (openBrackets.includes(char)) {
          stack.push({ char, lineNumber: index + 1 });
        } else if (closeBrackets.includes(char)) {
          const last = stack.pop(); // stack variable is used
          if (!last || brackets[last.char] !== char) { // if Mismatch found bellow error message is added
            addError(index + 1, `Unmatched ${char} found.`, `Missing corresponding ${last ? brackets[last.char] : 'opening'} bracket.`);
          }
        }
      }
    });
  
    // Check if any unmatched brackets remain in the code
    stack.forEach(({ char, lineNumber }) => { // if yes below the error message will be added
      addError(lineNumber, `Unmatched ${char} found.`, `Missing corresponding ${brackets[char]} bracket.`);
    });


    // each line is counted for the different languages
    // using syntax regex patterns to check for errors
    lines.forEach((line, index) => {
      // below are the generalised error checkings such as the comments /* */ # // and bracket () 
      // as most language use these conventions
      const lineNumber = index + 1;
      let trimmedLine = line.trim();
      if (trimmedLine.startsWith('/*')) inBlockComment = true;
      if (trimmedLine.endsWith('*/')) {
        inBlockComment = false;
        return; // Exit current iteration
      }
      if (inBlockComment || trimmedLine.startsWith('//') || trimmedLine === "") return; // Skip comments or empty lines
      if (trimmedLine.startsWith('#')) return;
  
      if (line.includes('(') && !line.includes(')')) {
        addError(lineNumber, "Unmatched opening parenthesis.", "Ensure every opening parenthesis '(' has a closing parenthesis ')'.");
      }
  
      // below are the if statments checking syntax errors depending on the program language
      // This check is done with Javascript, TypeScript and JSX due to their similarities
      if (['Javascript', 'Typescript' ].includes(language)) {
        const endsWithJSX = /<\/[a-zA-Z]+>$/; // Checks if a line ends with a JSX closing tag
        const likelyJSXOpening = /<\w+/; // Simplified check for JSX opening tags or self-closing component tags
        const likelyJSXClosing = /<\/\w+>/; // Simplified check for JSX closing tags

        if (!line.trim().endsWith(';') 
            && !line.trim().endsWith('}') 
            && !line.trim().endsWith('{') 
            && !endsWithJSX.test(line.trim()) // Check if line ends with JSX
            && line.trim() !== "" 
            && !line.trim().startsWith('for') 
            && !line.trim().startsWith('if') 
            && !line.trim().startsWith('while') 
            && !line.trim().startsWith('function') 
            && !line.trim().startsWith('//')
            && !likelyJSXOpening.test(line.trim()) // Exclude lines likely starting JSX elements
            && !likelyJSXClosing.test(line.trim()) // Exclude lines likely closing JSX elements
          ){ // error message is added if semi colon is found missing
            addError(lineNumber, "Possible missing semicolon.", "Consider adding a semicolon ';' at the end of the statement.");
        }

        // Basic check for unmatched JSX tags within a single line (may not be accurate)
        if (likelyJSXOpening.test(line.trim()) && !line.trim().includes('/>') && !likelyJSXClosing.test(line.trim())) {
          addError(lineNumber, "Unmatched JSX tag detected.", "Ensure JSX tags are properly closed.");
        }

      } else if (language === 'Python') { //
        // each line is checked on its indentation level
        if (!/^(\s{4})*\S/.test(line) && line.trim() !== "") {
          addError(lineNumber, "Line not indented correctly.", "Use multiples of 4 spaces for indentation.");
        }

        // checking if the block starts with a colon
        const blockStartersRegex = /\b(if|else|elif|for|while|def|class|with|try|except|finally)\b.*[^:]$/;
        if (blockStartersRegex.test(trimmedLine)) { // if it dosen't error message is added
          addError(lineNumber, "Block statement not ending with a colon.", "Ensure the statement ends with a colon ':'.");
        }

        //check if a Misuse of variable assignments within the code
        const ifConditionAssignmentRegex = /\bif\b.*=.*$/; 
        if (ifConditionAssignmentRegex.test(trimmedLine)) { // if there is a misuse, error message is added
          addError(lineNumber, "Possible misuse of assignment '=' instead of equality '=='.", "Use '==' for equality checks in conditions.");
        }

        // Method definitions should start with 'self'
        const methodDefinitionRegex = /\bdef\b\s+\w+\((?!self)/;
        if (methodDefinitionRegex.test(trimmedLine)) { // if there is no self after def then error message is added
          addError(lineNumber, "Instance method definition missing 'self'.", "The first parameter of instance methods should be 'self'.");
        }
        if (/\b(def|class)\S/.test(line)) { // check weather the def and class have space if not error message
          addError(lineNumber, "'def' or 'class' should be followed by a space.", "Add a space between 'def' or 'class' and the name.");
        }
      } else if (language === 'Java') {
        // Check for class declarations missing either public, protected or private
        if (/\bclass\b/.test(trimmedLine) && !/\b(public|protected|private)\b/.test(trimmedLine)) {
          // if class isn't declared correclty, error message is added
          addError(lineNumber, "Class declaration missing access modifier.", "Precede the class name with 'public', 'protected', or 'private'.");
        }
        
        // a quick if statment generate that checks what shouldn't have a semi colon
        const endsWithControlSymbols = ['{', '}', ';'].some(symbol => trimmedLine.endsWith(symbol));
        const startsWithKeywords = ['if', 'for', 'while', 'do', '}', 'import', 'package'].some(keyword => trimmedLine.startsWith(keyword));
        const containsClassOrInterface = ['class', 'interface'].some(keyword => trimmedLine.includes(keyword));
  
        // if statment that uses the above to check the folowing keywords exist in the line of code
        // error message will be added if the conditions below meet
        if (!endsWithControlSymbols && !startsWithKeywords && !containsClassOrInterface && trimmedLine !== "") {
          addError(lineNumber, "Possible missing semicolon.", "Add a semicolon ';' at the end of the statement.");
        }
      } else if (language === 'HTML') {
        // Check for unmatched tags <>
        if (line.includes('<') && !line.includes('>')) {
          // if the tags are not matched correctly an error message will be added must be <tag> not <tag<
          addError(lineNumber, "Unmatched tag detected.", "Ensure each opening tag '<tag>' has a corresponding closing tag '</tag>'.");
        }
      
        // Check for tags not properly closed on the same line 
        const tagNotClosedRegex = /<([^\/>\s]+)\s*[^>]*?>((?!\/>).)*<\/\1>/; // skips over tags with attributes within and self closing tags
        if (!tagNotClosedRegex.test(line) && line.includes('<') && line.includes('>')) {
          addError(lineNumber, "Tag not properly closed.", "Ensure the tag is properly closed on the same line.");
        }
      
        // Check for missing quotes around attribute values such as class = ""
        const missingQuotesAttrRegex = /<\w+[^>]*\b\w+=(?!["'])\b[^>]*>/;
        if (missingQuotesAttrRegex.test(line)) { //missing quotes
          addError(lineNumber, "Attribute value missing quotes.", "Ensure attribute values are enclosed in quotes.");
        }
      
        // Detect unfinished HTML comments
        if (line.includes('<!--') && !line.includes('-->')) { // if not completed error message below is added
          addError(lineNumber, "Unfinished HTML comment detected.", "Ensure the comment is properly closed with '-->'.");
        }
      
        // Validate self-closing tags (simplified check)
        const selfClosingTagRegex = /<\w+( \w+=(["']).*?\2)*\/?>/;
        if (!selfClosingTagRegex.test(line) && line.includes('/>')) { // if the closed tag isn't there error message is added
          addError(lineNumber, "Incorrect self-closing tag syntax.", "Check the syntax for self-closing tags, e.g., '<img src=\"image.png\" />'");
        }
      
      } else if (language === 'C#') {
            // Check for class declarations missing access modifiers
        if (/\bclass\b/.test(line) && !/\b(public|private|protected|internal|protected internal|private protected)\b/.test(line)) {
          addError(lineNumber, "Class declaration missing access modifier.", "Classes should declare an access level by preceding with 'public', 'private', etc.");
        }
      
        // Semicolon check for C# statements
        if (!line.trim().endsWith(';') && !line.trim().endsWith('}') && !line.trim().endsWith('{') && !line.trim().endsWith(']') && line.trim() !== "" && !line.trim().startsWith('//') && !line.trim().startsWith('/*')) {
          // error message is added if missing semicolon after antyhing that isn't the above e.g. ;; is false error and skipped over
          addError(lineNumber, "Possible missing semicolon.", "C# statements should end with a semicolon ';'.");
        }
      
        // Namespace declaration check
        if (line.includes('class') && !code.includes('namespace')) {
          // error message is added if class is detected and not wrapped around namespace
          addError(lineNumber, "Missing namespace declaration.", "Consider wrapping your class definitions within a namespace.");
        }
      
        // Line is check useind regex for any methods and if anything is missing from it such public, private etc.
        if (/\bvoid\b|\bint\b|\bstring\b|\bdouble\b|\bbool\b/.test(line) && !/\b(public|private|protected|internal)\b/.test(line) && /\bclass\b/.test(code)) {
          // error message is added if pbulic or private etc. are missing from method such as class
          addError(lineNumber, "Method missing access modifier.", "Methods should specify an access modifier, like 'public', 'private', etc.");
        }
      
        // Incorrect assignment in condition
        if (/\bif\s*\(.+=.+\)/.test(line)) {
          // error message is added if the conditions within for example an if statment isn't using the correct comparison = instead of ==
          addError(lineNumber, "Incorrect assignment in conditional.", "Use '==' for comparison inside conditions, not '='.");
        }

      } else if (language === 'Rust') {
        // Check for missing semicolons in statements
        if (!line.trim().endsWith(';') && !line.trim().endsWith('}') && !line.trim().endsWith('{') && !line.trim().endsWith(']') && line.trim() !== "" && !line.trim().endsWith('>') && !line.trim().startsWith('//') && !line.includes("fn ") && !line.includes("struct ") && !line.includes("enum ") && !line.includes("match ")) {
          // if semiclon is missing from anything not {} ] or ; then error message is added error message is not added if ; is alreayd n use
          addError(lineNumber, "Possible missing semicolon.", "Rust statements outside of control blocks should end with a semicolon ';'.");
        }
      
        // Function declaration syntax error
        if (line.includes("fn") && !line.includes("(")) {
          // if the line includes fn but dosen't have a () then an error message will be added
          addError(lineNumber, "Function declaration syntax error.", "Ensure function declarations include parentheses '()'.");
        }
      
        // Match arm ends with a comma
        if (line.includes("match") || (line.trim().endsWith("=>") && !line.trim().endsWith(","))) {
          // if the line has match or => but dosen't have a comma , then the error message below will be added
          addError(lineNumber, "Match arm possibly missing a comma.", "Match arms should end with a comma ','.");
        }
      
        // Check for missing '=>' in match arms
        const matchArmRegex = /match\s+\w+\s*{[^}]*\w+\s+\w+/; 
        if (matchArmRegex.test(line) && !line.includes("=>")) {
          // if the regex pattern 
          addError(lineNumber, "Missing '=>' in match arm.", "Match arms should use '=>' to separate patterns from expressions.");
        }
      
        // Unused variables that are not intentionally unused
        const unusedVarRegex = /\blet\s+[a-zA-Z_]\w*\s*=/; 
        if (unusedVarRegex.test(line) && !line.trim().startsWith("let _")) {
          addError(lineNumber, "Possible unused variable.", "If the variable is intentionally unused, prefix it with an underscore '_'.");
        }

        if (line.includes("let") && line.includes("=") && !line.includes("mut") && /[\+\-\*\/]=/.test(line)) {
          addError(lineNumber, "Variable might be missing 'mut' modifier.", "Variables that will be modified should be declared with 'mut'.");
        }
  
       // Add more Rust-specific checks as needed
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