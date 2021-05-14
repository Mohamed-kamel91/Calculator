import React, {useState} from "react"
const Context = React.createContext()

function ContextProvider(props) {
  const[input, setInput] = useState([])
  const[output, setOutput] = useState([0])
  const[isSecondOutput, setIsSecondOutput] = useState(true)
  const[isSecondInput, setIsSecondInput] = useState(false)
  
  // Reset/clear input and output screen
  function clearScreens() {
    setInput([])
    setOutput([0])
    setIsSecondOutput(true)
    setIsSecondInput(false)
  }

  // EVENT LISTENER: Add (+-*/) sign  on click and calculate Total
  function signClick(sign) {
    const outputStr = output.join("")
    const newOutput = output.slice(0,-1)
    const newOutputStr = newOutput.join("")

    if(!isSecondInput) {
      if(output[output.length-1] === ".") {
        setInput(prevInput => [...prevInput, newOutputStr, ` ${sign} `])
        setOutput(newOutput)
      } else {
        input.length < 1 ? setInput(prevInput => [...prevInput, outputStr, ` ${sign} `])
        : input.length > 1 ? setInput(prevInput => prevInput.slice(0,-1).concat(` ${sign} `)) 
        : null  
      }
    } else if(isSecondInput && input.length === 2 ) {
      output[output.length-1] === "." && sign === "=" ? setInput(prevInput => calculation(prevInput, newOutputStr, sign))
      : output[output.length-1] === "." && sign !== "=" ? setInput(prevInput => calculation(prevInput, newOutputStr, sign)) 
      : output[output.length-1] !== "." && sign === "=" ? setInput(prevInput => calculation(prevInput, outputStr, sign))
      : output[output.length-1] !== "." && sign !== "=" ? setInput(prevInput => calculation(prevInput, outputStr, sign))
      : null
    } else if(isSecondInput && input.length > 2) {
        if(sign !== "=") {
          setInput([output, ` ${sign} `])
          setIsSecondInput(false)
        }
    } 
  }
  
  // calculate input formula and project a total
  function calculation(prevInput, outputStr, sign) {
    const prevInputStr = prevInput.join("")
    const firstNum = Number(prevInput[0]) // convert string to number
    const secondNum = Number(outputStr) // convert string to number
    const initialTotal = /\+/g.test(prevInputStr) ? firstNum + secondNum
                       : /-/g.test(prevInputStr) ? firstNum - secondNum
                       : /×/g.test(prevInputStr) ? firstNum * secondNum
                       : /÷/g.test(prevInputStr) ? firstNum / secondNum
                       : null
    const actualTotal = handleExponentialTotal(initialTotal)
    const totalStr = typeof(actualTotal) !== "string" && actualTotal.toString()

    if(sign !== "=") {
      setOutput([actualTotal])
      setIsSecondOutput(true)
      setIsSecondInput(false)
      return [totalStr, ` ${sign} `]
    } else {
      setOutput([actualTotal])
      setIsSecondOutput(true)
      return [...prevInput, outputStr, ` ${sign} `]
    } 
  }

  // Function to handle exponential total
  function handleExponentialTotal(initialTotal) {
    if(initialTotal.toString().length > 9) {
      const expTotal = initialTotal.toExponential() //string e.g: "1.091e+12"
      const index = expTotal.indexOf("e")
      const firstExpTotalStr =  Number(expTotal.substring(0, index)).toFixed(4).toString() // handle the first part of expTotal e.g: "1.091"
      const secondExpTotalStr = expTotal.substring(index) // save the second part of expTotal e.g: "e+12"
      return firstExpTotalStr + secondExpTotalStr // concatnate the 2 part together after handling the decimal
    } else {
      return initialTotal
    }
  }

  // EVENT LISTENER: click on Numbers, decimal and delete buttons
  function numClick(number) {
    if (/=/g.test(input.join("")) && number !== "") {
      setInput([])
      setOutput([number])
      setIsSecondOutput(true)
      setIsSecondInput(false)
    } else if(/=/g.test(input.join("")) && number === "") {
      setInput(prevInput => prevInput)
      setOutput(prevOutput => prevOutput)
    } else if(output.length < 9 && input.length < 1) {
      addNumber(number)
    } else if(output.length < 9 && input.length > 0) {
      setIsSecondInput(true)
      isSecondOutput ? addSecondOutput(number) : addNumber(number)
    } else if(output.length === 9 && input.length > 0) {
      setIsSecondInput(true)
      isSecondOutput ? addSecondOutput(number) : !isSecondOutput && number === "" ?  deleteNum() : null
    } else if(output.length === 9 && number === "") {
      deleteNum()
    }
  }
    
 // Add the second output function
 function addSecondOutput(number) {
  setIsSecondOutput(false)
  setOutput(prevOutput => {
    // create empty array for second output and reset the previous output
    const newOutput = prevOutput.slice(prevOutput.length)
    return number === "." ? [...newOutput, 0, number] : [...newOutput, number]
  })
}

  // Add number/decimal on Click and handle zero and decimal function
  function addNumber(number) {
    if(number === "") {
      deleteNum()
    } else {
        setOutput(prevOutput => {
          const newOutput = [...prevOutput, number]
          const [, ...rest] = newOutput

          return prevOutput[0] === 0 && prevOutput.length === 1 && number === 0 ? prevOutput
                : prevOutput.includes(".") && number === "." ? prevOutput
                : prevOutput[0] === 0 && number === "." ? newOutput
                : prevOutput[0] === 0 && prevOutput.includes(".") && number !== "." ? newOutput
                : prevOutput[0] === 0 && !prevOutput.includes(".") && number !== "." ? rest
                : newOutput
        })
      }
  }

  // Delete numbers when clicking backspace
  function deleteNum() {
    output.length === 1 ? setOutput([0]) : setOutput(prevOutput => prevOutput.slice(0,-1))
  }

  return (
    <Context.Provider 
      value={{
        input,
        output,
        clearScreens,
        signClick,
        numClick
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}