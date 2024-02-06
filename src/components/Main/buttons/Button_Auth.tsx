type PropsType = {
    buttonText: string
    onClick: () => Promise<void>
}

const ButtonAuth = (props: PropsType) => {

    const buttonText = props.buttonText;
    const onClick = props.onClick;

    const content = (
        <button onClick={onClick}>{buttonText}</button>
    )
    
    return content;
}

export default ButtonAuth