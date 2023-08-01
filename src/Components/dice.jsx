function Dice(props) {
    return (
        <button onClick={() => props.holdDice(props.id)} className={props.isHeld && "btn btn-success text-lg shadow-lg" || "btn text-lg shadow-lg"}>{props.value}</button>
    )
}

export default Dice