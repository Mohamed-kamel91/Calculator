import React from "react"
import NumButton from "./NumButton"
import {buttonsArray, numId} from "../utils"

function NumberPad() {
  const numButtons = buttonsArray().map((num,i) => (
    <NumButton key={i} number={num} id={numId(i)} />
  ))

  return (
    <div className="numpad-container">
      {numButtons}
    </div>
  )
}

export default NumberPad