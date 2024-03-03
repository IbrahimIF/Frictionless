import '../output.css'
import React, { useState, useEffect, useRef, useContext } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
import {ThemeContext} from "../../../Context/SavedChanges";
import { useCodeMirrorContext } from '../../../Context/CodeMirrorExtension';

function detect() {
  const { codeTheme, codeLanguage, isDarkMode, codeValue  } = useContext(ThemeContext);
  const codeMirrorRef = useRef(null);
  const { getTheme, getLanguageExtension } = useCodeMirrorContext();


  return (
    <>
<div className="output-box">
<CodeMirror
      ref={codeMirrorRef}
      value={codeValue}
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