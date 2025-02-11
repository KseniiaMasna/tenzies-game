import { useState } from "react"
import { nanoid } from "nanoid"
import Die from "./components/Die"

export default function App() {
    
    const [dice, setDice] = useState(generateAllNewDice())
    
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
        <main className="flex flex-col justify-evenly items-center h-full rounded ">
            <div className="grid grid-cols-5 gap-5 ">
                {diceElements}
            </div>
            
            <button className="h-[50px] w-[100px] border-none rounded-md bg-red-700 m-12 text-white text-lg" onClick={rollDice}>Roll</button>
            
        </main>
    )
}