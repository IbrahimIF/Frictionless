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

    const brackets = {
      '(': ')',
      '{': '}',
      '[': ']',
    };
    const openBrackets = Object.keys(brackets);
    const closeBrackets = Object.values(brackets);
    let stack = []; // Use a stack to track open brackets

  const addError = (lineNumber, message, suggestion) => {
    errors.push({ line: lineNumber, message, suggestion });
  };


  lines.forEach((line, index) => {
    // Similar initial checks as before
  
    for (let char of line) {
      if (openBrackets.includes(char)) {
        stack.push({ char, lineNumber: index + 1 }); // Push open brackets onto the stack
      } else if (closeBrackets.includes(char)) {
        const last = stack.pop();
        if (!last || brackets[last.char] !== char) { // Mismatch found
          addError(index + 1, `Unmatched ${char} found.`, `Missing corresponding ${last ? brackets[last.char] : 'opening'} bracket.`);
        }
      }
    }
  });
  
  // Check if any unmatched brackets remain in the stack
  stack.forEach(({ char, lineNumber }) => {
    addError(lineNumber, `Unmatched ${char} found.`, `Missing corresponding ${brackets[char]} bracket.`);
  });

  lines.forEach((line, index) => {
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

    // Consolidating JavaScript and TypeScript checks due to similarity
    if (['JavaScript', 'TypeScript'].includes(language)) {
      // Adjust the semicolon rule to accommodate JSX
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
  ) {
    addError(lineNumber, "Possible missing semicolon.", "Consider adding a semicolon ';' at the end of the statement.");
  }

  // Basic check for unmatched JSX tags within a single line
  // Note: This check is very basic and may not accurately handle nested or multi-line JSX.
  if (likelyJSXOpening.test(line.trim()) && !line.trim().includes('/>') && !likelyJSXClosing.test(line.trim())) {
    addError(lineNumber, "Unmatched JSX tag detected.", "Ensure JSX tags are properly closed.");
  }

  // Add additional JSX-specific checks as needed
    } else if (language === 'Python') {
          // Indentation check
      if (!/^(\s{4})*\S/.test(line) && line.trim() !== "") {
        addError(lineNumber, "Line not indented correctly.", "Use multiples of 4 spaces for indentation.");
      }
    
      // Block starts with a colon
      const blockStartersRegex = /\b(if|else|elif|for|while|def|class|with|try|except|finally)\b.*[^:]$/;
      if (blockStartersRegex.test(trimmedLine)) {
        addError(lineNumber, "Block statement not ending with a colon.", "Ensure the statement ends with a colon ':'.");
      }
    
      // Misuse of assignment in if conditions
      const ifConditionAssignmentRegex = /\bif\b.*=.*$/;
      if (ifConditionAssignmentRegex.test(trimmedLine)) {
        addError(lineNumber, "Possible misuse of assignment '=' instead of equality '=='.", "Use '==' for equality checks in conditions.");
      }
    
      // Method definitions should start with 'self'
      const methodDefinitionRegex = /\bdef\b\s+\w+\((?!self)/;
      if (methodDefinitionRegex.test(trimmedLine)) {
        addError(lineNumber, "Instance method definition missing 'self'.", "The first parameter of instance methods should be 'self'.");
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
    addError(lineNumber, "Unmatched tag detected.", "Ensure each opening tag '<tag>' has a corresponding closing tag '</tag>'.");
  }

  // Check for tags not properly closed on the same line
  const tagNotClosedRegex = /<([^\/>]+)>.+<\/\1>/;
  if (!tagNotClosedRegex.test(line) && line.includes('<') && line.includes('>')) {
    addError(lineNumber, "Tag not properly closed.", "Ensure the tag is properly closed on the same line.");
  }

  // Check for missing quotes around attribute values
  const missingQuotesAttrRegex = /<\w+[^>]*\b\w+=(?!["'])\b[^>]*>/;
  if (missingQuotesAttrRegex.test(line)) {
    addError(lineNumber, "Attribute value missing quotes.", "Ensure attribute values are enclosed in quotes.");
  }

  // Detect unfinished HTML comments
  if (line.includes('<!--') && !line.includes('-->')) {
    addError(lineNumber, "Unfinished HTML comment detected.", "Ensure the comment is properly closed with '-->'.");
  }

  // Validate self-closing tags (simplified check)
  const selfClosingTagRegex = /<\w+( \w+=(["']).*?\2)*\/?>/;
  if (!selfClosingTagRegex.test(line) && line.includes('/>')) {
    addError(lineNumber, "Incorrect self-closing tag syntax.", "Check the syntax for self-closing tags, e.g., '<img src=\"image.png\" />'");
  }

  // Add more HTML-specific checks as needed
    } else if (language === 'C#') {
          // Check for class declarations missing access modifiers
      if (/\bclass\b/.test(line) && !/\b(public|private|protected|internal|protected internal|private protected)\b/.test(line)) {
        addError(lineNumber, "Class declaration missing access modifier.", "Classes should declare an access level by preceding with 'public', 'private', etc.");
      }
    
      // Semicolon check for C# statements
      if (!line.trim().endsWith(';') && !line.trim().endsWith('}') && !line.trim().endsWith('{') && !line.trim().endsWith(']') && line.trim() !== "" && !line.trim().startsWith('//') && !line.trim().startsWith('/*')) {
        addError(lineNumber, "Possible missing semicolon.", "C# statements should end with a semicolon ';'.");
      }
    
      // Namespace declaration check
      if (line.includes('class') && !code.includes('namespace')) {
        addError(lineNumber, "Missing namespace declaration.", "Consider wrapping your class definitions within a namespace.");
      }
    
      // Access modifier for methods
      if (/\bvoid\b|\bint\b|\bstring\b|\bdouble\b|\bbool\b/.test(line) && !/\b(public|private|protected|internal)\b/.test(line) && /\bclass\b/.test(code)) {
        addError(lineNumber, "Method missing access modifier.", "Methods should specify an access modifier, like 'public', 'private', etc.");
      }
    
      // Incorrect assignment in condition
      if (/\bif\s*\(.+=.+\)/.test(line)) {
        addError(lineNumber, "Incorrect assignment in conditional.", "Use '==' for comparison inside conditions, not '='.");
      }
    
      // Add more C# specific checks as needed
    } else if (language === 'Rust') {
        // Check for missing semicolons in statements
  if (!line.trim().endsWith(';') && !line.trim().endsWith('}') && !line.trim().endsWith('{') && !line.trim().endsWith(']') && line.trim() !== "" && !line.trim().endsWith('>') && !line.trim().startsWith('//') && !line.includes("fn ") && !line.includes("struct ") && !line.includes("enum ") && !line.includes("match ")) {
    addError(lineNumber, "Possible missing semicolon.", "Rust statements outside of control blocks should end with a semicolon ';'.");
  }

  // Function declaration syntax error
  if (line.includes("fn") && !line.includes("(")) {
    addError(lineNumber, "Function declaration syntax error.", "Ensure function declarations include parentheses '()'.");
  }

  // Match arm ends with a comma
  if (line.includes("match") || (line.trim().endsWith("=>") && !line.trim().endsWith(","))) {
    addError(lineNumber, "Match arm possibly missing a comma.", "Match arms should end with a comma ','.");
  }

  // Check for missing '=>' in match arms
  const matchArmRegex = /match\s+\w+\s*{[^}]*\w+\s+\w+/; // Simplified regex, real use may need a more complex pattern
  if (matchArmRegex.test(line) && !line.includes("=>")) {
    addError(lineNumber, "Missing '=>' in match arm.", "Match arms should use '=>' to separate patterns from expressions.");
  }

  // Unused variables that are not intentionally unused
  const unusedVarRegex = /\blet\s+[a-zA-Z_]\w*\s*=/; // This regex is very basic and might have false positives
  if (unusedVarRegex.test(line) && !line.trim().startsWith("let _")) {
    addError(lineNumber, "Possible unused variable.", "If the variable is intentionally unused, prefix it with an underscore '_'.");
  }

  // Missing 'mut' for mutable variables
  // Note: This is a highly simplistic and likely inaccurate check, real usage requires more context than regex can provide
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