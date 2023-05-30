import React, { useState, useEffect } from "react";
import Button from "../UI/Button";

const Calculator = () => {
  
  const [displayValue, setDisplayValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);

  const handleDigit = (digit) => {
    setDisplayValue(displayValue + digit);
    setWaitingForOperand(false);
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue(displayValue + '0.');
      setWaitingForOperand(false);
    } else {
      const lastOperatorIndex = displayValue.lastIndexOf(operator)
      const lastOperand = displayValue.slice(lastOperatorIndex+1)
      if (!lastOperand.includes('.')) {
        setDisplayValue(displayValue + '.')
      }
    }
  };

  const handleClear = () => {
    setDisplayValue('');
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleOperation = (nextOperator) => {
    if (displayValue === '') return
    if (displayValue.lastIndexOf(operator) === displayValue.length-1 ){
      setDisplayValue(displayValue.slice(0,-1) + nextOperator)
    } else {
      setDisplayValue(displayValue + nextOperator)
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
    calculate();
  };

  const calculate = (compute = false) => {
    let calculatedValue = null
    try {
      let tempDisplayValue = displayValue
      tempDisplayValue = tempDisplayValue.replace('x', '*')
      tempDisplayValue = tempDisplayValue.replace('÷', '/')
      // eslint-disable-next-line
      calculatedValue = eval(tempDisplayValue) || ''
      if (compute) {
        setAnswer('')
        setDisplayValue(String(calculatedValue))
      } else {
        if (String(calculatedValue) === displayValue) {
          setAnswer('')
        } else {
          setAnswer(String(calculatedValue))
        }
      }
    } catch (error) {
      // console.error(error)
      setAnswer('')
    }
  }

  useEffect(calculate, [displayValue])

  // const handlePercentage = () => {
  //   setDisplayValue((prevDisplayValue) => {
  //     const changedValue = parseFloat(prevDisplayValue) /100;
  //     return String(changedValue)
  //   })
  // }

  const handleSign = () => {
    if (waitingForOperand) return
    const lastOperatorIndex = displayValue.lastIndexOf(operator)
    const lastOperand = displayValue.slice(lastOperatorIndex+1)
    let updatedLastOperand = ''
    if (lastOperand.startsWith('(-') && lastOperand.endsWith(')')) {
      updatedLastOperand = lastOperand.slice(2, -1)
    } else {
      updatedLastOperand = '(-' + lastOperand + ')'
    }
    const newDisplayValue = displayValue.slice(0, lastOperatorIndex+1) + updatedLastOperand
    setDisplayValue(newDisplayValue)
  }
  
  return(
    <div className="component-button">
      <div className="display-wrapper">
        <div className="display">{displayValue}</div>
        <div className="display display-answer">{answer}</div>
      </div>
      <div className="button-panel">
        <div>
          <Button text={'AC'} className="widebtn" onClick={() => handleClear()}/>
          <Button text={'+/-'} className="btntype-2" onClick={() => handleSign()}/>
          {/* <Button text={'%'} className="btntype-1" onClick={() => handlePercentage()}/> */}
          <Button text={'÷'} className="btntype-2" onClick={() => handleOperation('÷')}/>
        </div>
        <div>
          <Button text={'7'} className="btntype-1" onClick={() => handleDigit('7')}/>
          <Button text={'8'} className="btntype-1" onClick={() => handleDigit('8')}/>
          <Button text={'9'} className="btntype-1" onClick={() => handleDigit('9')}/>
          <Button text={'x'} className="btntype-2" onClick={() => handleOperation('x')}/>
        </div>
        <div>
          <Button text={'4'} className="btntype-1" onClick={() => handleDigit('4')}/>
          <Button text={'5'} className="btntype-1" onClick={() => handleDigit('5')}/>
          <Button text={'6'} className="btntype-1" onClick={() => handleDigit('6')}/>
          <Button text={'-'} className="btntype-2" onClick={() => handleOperation('-')}/>
        </div>
        <div>
          <Button text={'1'} className="btntype-1" onClick={() => handleDigit('1')}/>
          <Button text={'2'} className="btntype-1" onClick={() => handleDigit('2')}/>
          <Button text={'3'} className="btntype-1" onClick={() => handleDigit('3')}/>
          <Button text={'+'} className="btntype-2" onClick={() => handleOperation('+')}/>
        </div>
        <div>
          <Button text={'0'} className="btntype-1" onClick={() => handleDigit('0')}/>
          <Button text={'.'} className="btntype-1" onClick={() => handleDecimal()}/>
          <Button text={'='} className="widebtn" onClick={() => calculate(true)}/>
        </div>
      </div>
    </div>
  )
}
export default Calculator