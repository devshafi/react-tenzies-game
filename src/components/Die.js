export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }
    // console.log(styles)
    return (
        <div onClick={() => props.toggleIsHeld(props.id)} className="die" style={styles}>
            <span>{props.value}</span>
        </div>
    )
}