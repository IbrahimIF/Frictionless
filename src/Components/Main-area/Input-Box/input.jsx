import React, { useState, useEffect, useRef, useContext } from "react";
import {ThemeContext} from "../../Context/SavedChanges";

import  CodeMirror  from '@uiw/react-codemirror';
import { useCodeMirrorContext } from '../../Context/CodeMirrorExtension';

import "./Input.css";

/* Font awseome Icon */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';


function input() {
  const { codeTheme, codeLanguage, clearCodeTrigger, setCodeValue } = useContext(ThemeContext);
  const [code, setCode] = useState("type here (${codeLanguage})"); /*sets default value as type here*/
  const [isCodeTyped, setIsCodeTyped] = useState(false);
  const { getTheme, getLanguageExtension } = useCodeMirrorContext();
  const codeMirrorRef = useRef(null);

// Update the codeLanguage value whenever the selected language changes
  useEffect(() => {  
    setCode(`type here (${codeLanguage})`);
    setIsCodeTyped(false);
  }, [codeLanguage]);

  useEffect(() => {
    // Respond to the clear code trigger
    setCode(`type here (${codeLanguage})`);
    setIsCodeTyped(false);
  }, [clearCodeTrigger, codeLanguage]);

  useEffect(() => {
    // Update codeValue in the context whenever code changes
    setCodeValue(code);
  }, [code, setCodeValue]);

  /*Whenever paste button is pressed code value is updated*/
  const handlePasteButtonClick = () => {
    navigator.clipboard.readText().then((clipboardData) => {
      // Update CodeMirror value with clipboard data
      setCode(clipboardData);
      setIsCodeTyped(true);
    });
  };
  

  return (
    <>
      <div className="input-box">
        <CodeMirror
        ref={codeMirrorRef}
        value={code}
        className="CodeMirror"
        extensions={[getLanguageExtension(codeLanguage)]}
        theme={getTheme(codeTheme)}
        onChange={(value, viewUpdate) => {
          setCode(value);
          setIsCodeTyped(value !== `type here (${codeLanguage})`);
          console.log('value:', value);
        }}
        />
        {!isCodeTyped && (
          <button className="paste" onClick={handlePasteButtonClick}><span><FontAwesomeIcon className="icon" icon= {faClipboard} /> <br/><br/> paste code</span> <span>done</span></button>
        )}
      </div>
    </>
  )
}

export default input