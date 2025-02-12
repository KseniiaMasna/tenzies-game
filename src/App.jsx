import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Die from "./components/Die"

export default function App() {
    const buttonRef = useRef(null)
    
    const [dice, setDice] = useState(generateAllNewDice())

    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)    

    useEffect(() => {
        if(gameWon){
            buttonRef.current.focus();             
        }        
    }, [gameWon])
    
    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            })
        )
    }
    
    function rollDice() {
        setDice(prevDice => prevDice.map(die =>
            die.isHeld ? 
                die 
                : {...die,
                    value: Math.ceil(Math.random() * 6)
                }
        ))
    }

    function holdDie(id) {
        setDice(prevDice => prevDice.map(die => 
                die.id === id ? 
                    {...die, isHeld: !die.isHeld} :
                    die
            )
        )
    }
    
    const diceElements = dice.map(diceElement => <Die 
        value={diceElement.value} 
        key={diceElement.id} 
        isHeld={diceElement.isHeld}
        onClick={() => holdDie(diceElement.id)}/>)
    
    return (
        <main className="flex flex-col justify-evenly items-center h-full rounded">
            <h1 className="text-white text-5xl p-4">Tenzies</h1>
            <p className="text-white  max-w-lg p-4 text-center font-normal">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="grid grid-cols-5 gap-5 p-8 ">
                {diceElements}
            </div>
            
            <button ref={buttonRef} className="h-[50px] w-auto whitespace-nowrap px-8 border-none rounded-md bg-red-700 m-12 text-white text-lg" onClick={gameWon ? () => setDice(generateAllNewDice) : rollDice}>{gameWon ? "New Game" : "Roll"}</button>
            {gameWon && <Confetti className="w-screen h-screen"/>}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
        </main>
    )
}