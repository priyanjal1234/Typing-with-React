import React, { useEffect, useState } from "react";
import generateRandomWords from "./utils/generateRandomWords";
import calculateWpm from "./utils/calculateWpm";

const App = () => {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [testIsActive, setTestIsActive] = useState(true);
  const [timer, setTimer] = useState(60);
  const [wpm, setwpm] = useState(0) 

  useEffect(() => {
    setText(generateRandomWords());
  }, []);

  useEffect(() => {
    if (timer > 0 && testIsActive) {
      const timeInterval = setInterval(() => {
        setTimer((prev) => prev - 1); 
      }, 1000);

      
      return () => clearInterval(timeInterval);
    } else if (timer === 0) {
      setTestIsActive(false); 
    }

  }, [timer, testIsActive]);

  function handleChange(e) {
    if (!testIsActive) return; 
    let input = e.target.value 
    setUserInput(input)

    let splittedText = text.split('')
    let splittedUserInput = input.split('')

    let newFeedback = splittedText.map((char,index) => {
      if(index < splittedUserInput.length) {
        return char === splittedUserInput[index] ? "correct" : "wrong"
      }
      else {
        return "neutral"
      }
    })

    setFeedback(newFeedback);

    if(input === text) {
      setTestIsActive(false)
      let timeTaken = 60 - timer
      setwpm(calculateWpm(text,timeTaken))
    }
  }

  function handleResetTest() {
    setTimer(60)
    setText(generateRandomWords())
    setUserInput("")
    setFeedback([])
    setTestIsActive(true)
    setwpm(0)
  }

  const renderTextWithFeedback = () => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={
          feedback[index] === "correct"
            ? "text-green-600"
            : feedback[index] === "wrong"
            ? "text-red-500"
            : "text-gray-500"
        }
      >
        {char}
      </span>
    ));
  };

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex flex-col items-center pt-10">
      <h2 className="text-2xl mb-4">
        Time Left:{" "}
        <span className={timer <= 10 ? "text-red-500" : "text-green-500"}>
          {timer}s
        </span>
      </h2>

      <h1 className="text-3xl font-semibold mb-4">
        {renderTextWithFeedback()}
      </h1>
      <textarea
        placeholder="Type the above text"
        className="mt-4 w-[800px] h-[100px] bg-zinc-700 outline-none resize-none px-3 py-2"
        name="userInput"
        value={userInput}
        onChange={handleChange}
        disabled={!testIsActive}
      ></textarea>
      {!testIsActive && (
        <>
        <p className="text-xl mt-4 text-yellow-500">
          {timer === 0
            ? "Time's up! Test over."
            : "Great job! You finished the text."}
        </p>
        <p className="mt-3 text-2xl font-semibold">
          {wpm} wpm
        </p>
        </>
      )}
      <button onClick={handleResetTest} className="mt-3 px-3 py-2 bg-blue-600 rounded-lg">
        Reset
      </button>
    </div>
  );
};

export default App;
