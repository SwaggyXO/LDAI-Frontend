import './textcontainer.scss';

type TextProps = {
    elements: JSX.Element
    className: string
}
const TextContainer = (props: TextProps) => {

    const elements = props.elements;
    const className = props.className;

    const content = (
        <div className={`parent-text ${className}-text`}>
            <div className={`parent-text_container ${className}-text_container`}>
                {elements}
            </div>
        </div>
    )

    return content;
}

export default TextContainer