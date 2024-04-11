import "./Capsule.scss";

type PropsType = {
    capsulePosition: string,
    text: string,
    bgColor: string,
    textColor: "black" | "white",
    onClick?: () => void
}

const Capsule = (props: PropsType) => {
    const content = (
        <div className={`capsule--${props.capsulePosition}`} style={{backgroundColor: props.bgColor, color: props.textColor}} onClick={props.onClick}>
            <p> {props.text} </p>
        </div>
    )

    return content;
}

export default Capsule