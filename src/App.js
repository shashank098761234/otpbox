import { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function App() {
  const DIGIT_OTP_COUNT = 5;
  const [inputArr, setInputArr] = useState(new Array(DIGIT_OTP_COUNT).fill(""));
  const refArr = useRef([]);

  const handleChangeInput = (value, index) => {
    if (isNaN(value)) return;

    const newvalue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newvalue.slice(-1);
    setInputArr(newArr);

    console.log("newvalue", newvalue);

    newvalue && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  return (
    <div className="App">
      <h1>Valid OTP</h1>
      {inputArr.map((item, index) => (
        <input
          key={index}
          ref={(input) => (refArr.current[index] = input)}
          className="otp-input-style"
          type="text"
          value={inputArr[index]}
          onChange={(e) => handleChangeInput(e.target.value, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
        />
      ))}
    </div>
  );
}
