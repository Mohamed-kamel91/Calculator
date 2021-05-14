import React from "react"
import Signs from "./Signs"
import {signClass, signId} from "../utils"

const signsArray = ["+", "-", "=", "×", "÷"]

function SignsBar() {
  const signs = signsArray.map((sign, i) => (
    <Signs key={i} sign={sign} signClass={signClass(sign)} signId={signId(sign)} />
  ))

  return (
    <div className="signs-container">
      {signs}
    </div>
  )
}

export default SignsBar