import { useState, useEffect } from 'react'
import './App.css'
import Dice from "./Components/dice"
import Confetti from 'react-confetti'
import sound from './assets/cheer.mp3'

function App() {
  const [dice, setDice] = useState(generateDiceNumbers())
  const [tenzies, setTenzies] = useState(false)

  function playCheer() {
    new Audio(sound).play()
  }

  useEffect(() => {
    const firstValue = dice[0].value
    const gameWon = dice.every(die => die.value === firstValue && die.isHeld)
    if (gameWon) {
        setTenzies(true)
        playCheer()
        return
    } 
  }, [dice])

  function generateDiceNumbers() {
    const newDice = []

    for (let i = 0; i < 10; i++) {
      const newNum = Math.ceil(Math.random() * 6)
      newDice.push({value: newNum, isHeld: false, id: i})
    }

    return newDice
  }

  function ResetGame() {
    setTenzies(false)
    setDice(generateDiceNumbers())
  }

  function GenerateDice() {
    generateDiceNumbers().map(obj => {
      return <Dice value={obj.value}/>
    })
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map((die) => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }


  function RollDice() {
    setDice(oldDice => oldDice.map(die => {
      const newNum = Math.ceil(Math.random() * 6)
      return !die.isHeld ? {...die, value:newNum} : {...die}
    }))
  }

  const diceElements = dice.map((v, k) => {
    return (<Dice key={k} value={v.value} isHeld={v.isHeld} id={k} holdDice={holdDice} />)
  })

  return (
    <main className='bg-base-300 h-96 w-96 shadow-xl rounded-lg'>
        {tenzies && <Confetti />}
        <h1 className='m-5 mt-8 font-bold text-5xl text-center'>Tenzies</h1>
        <p className='m-5 text-center font-light text-sm'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        <div className='flex justify-center items-center h-max'>
          <div className="mx-12 grid grid-rows-2 grid-cols-5 gap-y-3 gap-3 w-[100%] h-max">
            {diceElements}
          </div>
        </div>

        <div className='flex justify-center'>
          <button onClick={tenzies && ResetGame || RollDice} className='btn btn-primary my-8 rounded-lg shadow-lg'>{tenzies && "You Won! Play Again?" || "Roll Dice"}</button>
        </div>
    </main>
  )
}

export default App
