import { useEffect, useState } from "react";
import Die from "./components/Die"
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'


export default function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function resetGame() {
    setTenzies(false);
    setDice(allNewDice())
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allValueSame = dice.every(die => die.value === firstValue);
    if (allHeld && allValueSame) {
      console.log('You won!!!!');
      setTenzies(true);
    }
  }, [dice])

  // generate a single die
  function generateNewDie() {
    const randomNum = Math.floor(Math.random() * 6 + 1);
    return {
      value: randomNum,
      isHeld: false,
      id: nanoid()
    }
  }

  // 10 random dice for initial state value
  function allNewDice() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(generateNewDie())
    }
    return dice
  }

  // only generate new one for the dice
  // that are not hold
  function rollDies() {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.isHeld === true ? die : generateNewDie();
      })
    })
  }

  // flip the hold
  function toggleIsHeld(id) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }

  const diesElements = dice.map(die => {
    return <Die
      key={die.id}
      {...die}
      toggleIsHeld={toggleIsHeld}
    />
  })

  return (
    <main>
      {tenzies && <Confetti numberOfPieces={100} gravity={0.1} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diesElements}
      </div>
      <button onClick={tenzies ? resetGame : rollDies} className="btn-roll-dies">{tenzies ? 'New Game' : 'Roll'}</button>
    </main>)

}
