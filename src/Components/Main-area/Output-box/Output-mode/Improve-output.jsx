import '../output.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
import {ThemeContext} from "../../../Context/SavedChanges";
import { useCodeMirrorContext } from '../../../Context/CodeMirrorExtension';
import beautify from 'js-beautify'; 
import { html_beautify } from 'js-beautify';

function indentCode(unformattedCode, codeLanguage) {
  let formattedCode;
  const defaultOptions = {
    indent_size: 4,
    space_in_empty_paren: true,
    indent_char: ' ',
    indent_with_tabs: false,
    end_with_newline: true
  };

  const javaScriptOptions = {
      // Prettier options for JavaScript/JSX
    semi: true,
    parser: "babel", // Use "babel-ts" for TypeScript
    tabWidth: 2,
    printWidth: 80,
    singleQuote: true,
    jsxBracketSameLine: false,
    jsxSingleQuote: false, // Adjust based on your preference
  };

  const htmlOptions = {
 // js-beautify options for HTML/JSX
 indent_size: 2,
 indent_char: ' ',
 max_preserve_newlines: 2,
 preserve_newlines: true,
 wrap_line_length: 80,
 unformatted: [
   'a',
   'span',
   'bdo',
   'em',
   'strong',
   'dfn',
   'code',
   'samp',
   'kbd',
   'var',
   'cite',
   'abbr',
   'acronym',
   'q',
   'sub',
   'sup',
   'tt',
   'i',
   'b',
   'big',
   'small',
   'u',
   's',
   'strike',
   'font',
   'ins',
   'del',
   'pre',
   'address',
   'dt',
   'h1',
   'h2',
   'h3',
   'h4',
   'h5',
   'h6',
 ],
 brace_style: 'collapse',
 indent_handlebars: true, // Enable indentation for handlebars-like syntax (JSX)
 wrap_attributes: 'force-aligned', // Wrap attributes to new lines and align them
 extra_liners: ['jsx'], //
  };

  const pythonOptions = {
    indent_size: 4,
    indent_char: ' ',
    indent_with_tabs: false,
    preserve_newlines: true,
    max_preserve_newlines: 2,
    keep_array_indentation: false
  };


  const javaOptions = {
    indent_size: 4,
    indent_char: ' ',
    indent_with_tabs: false,
    preserve_newlines: true,
    max_preserve_newlines: 2,
    brace_style: 'collapse,preserve-inline',
    keep_array_indentation: true
  };


  
  switch (codeLanguage) {
    case 'Javascript':
    case 'Typescript':
      formattedCode = beautify(unformattedCode, { ...javaScriptOptions, language: 'javascript' });
      break;

    case 'HTML':
      formattedCode = html_beautify(unformattedCode, { ...htmlOptions, language: 'html' });
      console.log('HTML CODE CHANGED.')
      break;

    case 'Java':
    case 'C#':
    case 'Rust':
      formattedCode = beautify(unformattedCode, { ...javaOptions, language: 'java' });
      break;

    case 'Python':
      formattedCode = beautify(unformattedCode, { ...pythonOptions, language: 'python' });
      break;

    default:
      formattedCode = beautify(unformattedCode, { ...defaultOptions, language: 'default' });
      console.log('HTML CODE CHANGED.')
      break;
  }

  return formattedCode;
}


function improve() {
  const { codeTheme, codeLanguage, clearCodeTrigger, codeValue, updateTrigger  } = useContext(ThemeContext);
  const codeMirrorRef = useRef(null);
  const [updatedCodeValue, setUpdatedCodeValue] = useState("");
  const { getTheme, getLanguageExtension } = useCodeMirrorContext();

  useEffect(() => {
    // Respond to the clear code trigger
    setUpdatedCodeValue(codeValue);
  }, [clearCodeTrigger]);


    useEffect(() => {
      // Get updated code value
      const unformattedCode = codeValue; 
  
      // Format the code using js-beautify
      const formattedCode = indentCode(unformattedCode, codeLanguage);
  
      // Set the formatted code
      setUpdatedCodeValue(formattedCode);
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