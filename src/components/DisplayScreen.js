import React, {useContext} from "react"
import {Context} from "../Context"

function DisplayScreen() {
  const{input, output, clearScreens} = useContext(Context)

  return (
    <div className="display-container">
      <div className="input-screen">{input}</div>
      <div className="output-box">
        <div className="output-screen">{output}</div>
        <div className="clear-screen" id="clear" onClick={clearScreens} />
      </div>
    </div>
  )
}

export default DisplayScreen