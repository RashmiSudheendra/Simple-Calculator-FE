import React, { useState } from "react";
import "./Calculator.css";
import axios from "axios";

function Calculator() {
  let [number1, setNumber1] = useState("");
  let [number2, setNumber2] = useState("");
  let [result, setresult] = useState("");
  let [exp, setExp] = useState("")
  let [operation, setoperation] = useState("");

  let clear = () => {
    setresult("");
    setNumber1("");
    setNumber2("");
    setoperation("");
    setExp("");
  };

  let backscpace = () => {
    setresult(result.slice(0, result.length - 1));
  };

  let handleClick = (e) => {
    setresult(result.concat(e.target.value));
    if (operation === "") {
      setNumber1(number1.concat(e.target.value));
    } else if (
      operation !== "" &&
      e.target.value !== "+" &&
      e.target.value !== "-" &&
      e.target.value !== "*" &&
      e.target.value !== "/" &&
      e.target.value !== "%"
    ) {
      setNumber2(number2.concat(e.target.value));
    }
  };

  let clr = ()=>{
    setTimeout(() => {
      setExp(result)
      setresult("");
    }, 1300);
  }

  let calculate = async () => {
    try {
      let res = await axios.post("https://localhost:7207/api/Calculation", {
        number1,
        number2,
        operation
      });
      // console.log(res.data);
      setExp(result)
      setresult(res.data);
      setNumber1("");
      setNumber2("");
      setoperation("");
    } catch (err) {
      setresult(Error);
    }
  };

  return (
    <div className="main">
      <input style={{height:"40px"}} className="mt-3" type="text" id="result" value={exp} onClick={(e) => handleClick(e)}/>
      <input className="mt-0 text" type="text" id="result" value={result}/>
      <div className="btn">
        <div className="mb-1">
          <input type="button" value="C" onClick={() => clear()} />
          <input type="button" value="%" onClick={(e) => handleClick(e)} onMouseUp={(e) => {setoperation(e.target.value);}}/>
          <input type="button" value="←" onClick={() => backscpace()}/>
          <input type="button" value="/" onClick={(e) => handleClick(e)} onMouseUp={(e) => {setoperation(e.target.value);}}/>
        </div>
        <div className="mb-1">
          <input type="button" value="7" onClick={(e) => handleClick(e)} />
          <input type="button" value="8" onClick={(e) => handleClick(e)} />
          <input type="button" value="9" onClick={(e) => handleClick(e)} />
          <input type="button" value="*" onClick={(e) => handleClick(e)} onMouseUp={(e) => {setoperation(e.target.value);}}/>
        </div>
        <div className="mb-1">
          <input type="button" value="4" onClick={(e) => handleClick(e)} />
          <input type="button" value="5" onClick={(e) => handleClick(e)} />
          <input type="button" value="6" onClick={(e) => handleClick(e)} />
          <input type="button" value="-" onClick={(e) => handleClick(e)} onMouseUp={(e) => {setoperation(e.target.value);}}/>
        </div>
        <div className="mb-1">
          <input type="button" value="1" onClick={(e) => handleClick(e)} />
          <input type="button" value="2" onClick={(e) => handleClick(e)} />
          <input type="button" value="3" onClick={(e) => handleClick(e)} />
          <input type="button" value="+" onClick={(e) => handleClick(e)} onMouseUp={(e) => {setoperation(e.target.value);}}/>
        </div>
        <div className="mb-1">
          <input type="button" value="00" onClick={(e) => handleClick(e)}/>
          <input type="button" value="0" onClick={(e) => handleClick(e)}/>
          <input type="button" value="." onClick={(e) => handleClick(e)}/>
          <input type="button" value="=" onClick={(e) => calculate(e)} onMouseLeave={()=>clr()}/>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
