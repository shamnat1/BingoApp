import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import shuffle from "shuffle-array";
import Confetti from 'react-confetti'
import "./Styles.css";

function Tile({ id, children, onToggle, isSet }) {
  return (
      <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
        {children}
      </div>
  );
}

function CenterTile({ id, children, onToggle, isSet }) {
  return (
      <div className={`tile tile--set center`}>
          CONFO CALL BINGO
      </div>
  );
}

const bingoTextList = [
    "Child Noise",
    "hello hello",
    "I need to jump in another call",
    "Can everyone go on mute",
    "Come closer to the mic",
    "Painful echo / feedback",
    "Next slide please",
    "Can we take this offline",
    "is --- on the call",
    "Could you share the slide afterwards",
    "can somebody grant presenter rights",
    "Can you email that to every one",
    "Sorry, had problem logging in",
    "The results look promising",
    "Animal noises in the background",
    "I was having connection issue ",
    "I'll have to get back to you ",
    "Who just joined",
    "Sorry something is wrong with my calendar",
    "Do you see my screen",
    "Let's wait for ___",
    "You will send the minutes?",
    "Sorry I was on mute",
    "Can you repeat please",
    "Happy to announce"
];


const data = shuffle(bingoTextList).reduce(
    (data, value, index) => ({ ...data, [index]: value }),
    {}
);

function App() {

  const [state, setState] = useState({ checked: {12:1} ,numberOfPieces:500});
  const isWon = (checked,id) => {
    const range = [0, 1, 2, 3, 4];let row = Math.floor(id/5)
      let column = id%5
    return (
        range.every(column => checked[row * 5 + column]) &&
        undefined !==
        range.every(column => checked[row * 5 + column]) ||
        range.every(row => checked[row * 5 + column]) &&
        undefined !==
        range.every(row => checked[row * 5 + column])  ||
        (row === column) &&
        range.every(index => checked[index * 5 + index]) ||
        (row + column === 4) &&
        range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id => {
      setState(state => {
              const checked = {...state.checked, [id]: !state.checked[id]};
              const won = isWon(checked,id);
              return {
                  ...state,
                  checked,
                  won,
                  numberOfPieces: 1000

              };
          }
      );
  }
    const completeConfetti = ()=>{
        setTimeout(() => {
            setState(state => {

                    return {
                        ...state,
                        numberOfPieces: 0

                    };
                }
            );
        }, 3000);
    }
    return (
        <div className="App">

            <div className="bingo-page">
                <div className="wrapper">
                    {Object.keys(data).map(id => (
                        (id == 12) ? (
    
                            <CenterTile
                                key={id}
                                id={id}
                                isSet={!!state.checked[id]}
                                onToggle={() => toggle(id)}
                            >
                                {data[id]}
                            </CenterTile>
                        ): <Tile
                            key={id}
                            id={id}
                            isSet={!!state.checked[id]}
                            onToggle={() => toggle(id)}
                        >
                            {data[id]}
                        </Tile>
    
    
    
                    ))}
                </div>
            </div>
            {state.won && state.numberOfPieces ?completeConfetti():''}
            {state.won ? <Confetti
                numberOfPieces={state.numberOfPieces}/> : null}



        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
