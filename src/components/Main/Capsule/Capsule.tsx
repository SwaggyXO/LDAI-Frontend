import "./Capsule.scss";

type PropsType = {
    capsulePosition: string,
    text: string,
    bgColor: string,
    textColor: "black" | "white",
}

const Capsule = (props: PropsType) => {
    const content = (
        <div className={`capsule--${props.capsulePosition}`} style={{backgroundColor: props.bgColor, color: props.textColor}}>
            {props.text}
        </div>
    )

    return content;
}

export default Capsule