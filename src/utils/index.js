export const buttonsArray = (num=9) => {
  let buttonsArr = [".", ""];
  let i;
  for(i = num; i>=0; i-=1) {
    buttonsArr.unshift(i);
  }
  return buttonsArr;
}

export function numId(i) {
  switch(i) {
    case 0:
      return "zero";
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    case 9:
      return "nine";
    case 10:
      return "decimal"
    default: 
    return "delete"
  }
}

export function signClass(sign) {
  switch(sign) {
    case "+":
      return "plus-sign";
    case "-":
      return "minus-sign";
    case "=":
      return "equal-sign";
    case "×":
      return "multiply-sign";
    case "÷":
      return "divide-sign";
  }
}

export function signId(sign) {
  switch(sign) {
    case "+":
      return "add";
    case "-":
      return "substract";
    case "=":
      return "equals";
    case "×":
      return "multiply";
    case "÷":
      return "divide";
  }
}