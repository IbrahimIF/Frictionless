import '../output.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
import {ThemeContext} from "../../../Context/SavedChanges";
import { useCodeMirrorContext } from '../../../Context/CodeMirrorExtension';



function defaul() {
  const { codeTheme, codeLanguage, isDarkMode,setCodeValue, codeValue, updateTrigger, clearCodeTrigger} = useContext(ThemeContext);
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