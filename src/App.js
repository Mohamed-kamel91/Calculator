import React from "react"
import Display from "./components/DisplayScreen"
import NumberPad from "./components/NumberPad"
import SignsBar from "./components/SignsBar"

function App() {
  return (
    <div className="inner-container">
      <Display />
      <div className="buttons-container">
        <SignsBar />
        <NumberPad />
      </div>
    </div>
  )
}

export default App