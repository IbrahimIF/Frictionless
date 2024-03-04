import '../output.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
import {ThemeContext} from "../../../Context/SavedChanges";
import { useCodeMirrorContext } from '../../../Context/CodeMirrorExtension';
import beautify from 'js-beautify'; 



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
      const formattedCode = beautify(unformattedCode, {
        indent_size: 4,
        space_in_empty_paren: true,
        indent_char: ' ',
        indent_with_tabs: false, 
        end_with_newline: true,
        language: 'javascript'
      });
  
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