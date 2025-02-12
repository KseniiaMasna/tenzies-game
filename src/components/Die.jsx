export default function Die(props) {
    return (
        <button 
            className={`h-[50px] w-[50px] shadow-md rounded-lg border-none ${props.isHeld? 'bg-green-900' : 'bg-white'} text-2xl font-bold`} 
            onClick={props.onClick}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}   
        >
            {props.value}         
        </button>
    )
}