
import "./Input.css";
import React, { useState, useEffect, useRef } from "react";
import  CodeMirror  from '@uiw/react-codemirror';
/*langauages*/ 
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
/* themes */
import {tokyoNight} from '@uiw/codemirror-theme-tokyo-night';



function input() {
  const [selectedcodeTheme, setcodeTheme] = useState(java);

  return (
    <>
<div className="input-box">
<CodeMirror
      value="type here"
      className="CodeMirror"
      extensions={[java()]}
      theme={tokyoNight}
      onChange={(value, viewUpdate) => {
        console.log('value:', value);
      }}
    />
</div>
    </>
  )
}

export default input