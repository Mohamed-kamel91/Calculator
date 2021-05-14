import React, {useContext} from "react"
import {Context} from "../Context"

function Signs({sign, signClass, signId}) {
  const {signClick} = useContext(Context)
  
  return (
      <div className={`sign ${signClass}`} id={signId} onClick={() => signClick(sign)}>
        {sign}
      </div>
  )
}

export default Signs