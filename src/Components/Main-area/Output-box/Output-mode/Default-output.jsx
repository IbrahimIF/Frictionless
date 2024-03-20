import React, { useState, useEffect, useRef, useContext } from "react";
import {ThemeContext} from "../../../Context/SavedChanges";

import  CodeMirror  from '@uiw/react-codemirror';
import { useCodeMirrorContext } from '../../../Context/CodeMirrorExtension';

import '../output.css'

/*The default output box when no mode is picked */
function defaul() {
  const { codeTheme, codeLanguage, codeValue, updateTrigger, clearCodeTrigger} = useContext(ThemeContext);
  const codeMirrorRef = useRef(null);
  const [updatedCodeValue, setUpdatedCodeValue] = useState("");
  const { getTheme, getLanguageExtension } = useCodeMirrorContext();

  useEffect(() => {
    // Respond to the clear code trigger
    setUpdatedCodeValue(codeValue);
  }, [clearCodeTrigger]);

  useEffect(() => {
    // Respond to the updated code trigger
    setUpdatedCodeValue(codeValue);
  }, [updateTrigger]);

  /* This mode will output the code value without any changes as default */
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

export default defaul