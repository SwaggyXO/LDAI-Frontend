import { useNavigate } from "react-router-dom";

type PropsType = {
    buttonText: string | JSX.Element
    onClick?: (() => Promise<void>) | (() => void)
    className: string
    to?: string
    check?: boolean
}

const Button = (props: PropsType) => {

    const buttonText = props.buttonText;
    const onClick = props.onClick;
    const className = props.className;
    const to = props.to!;
    const check = props.check;

    const navigate = useNavigate();

    const handleNav = () => {
        navigate(to);
    }

    const content = (
        to ? 
            <button onClick={handleNav} className={className}>{buttonText}</button> : 
            <button onClick={onClick} className={className} disabled={check}>{buttonText}</button>
    );
    
    return content;
}

export default Button