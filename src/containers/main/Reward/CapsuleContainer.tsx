import "./CapsuleContainer.scss";

type PropsType = {
    capsules: React.ReactNode[]
}

const CapsuleContainer = (props: PropsType) => {
    const content = (
        <div className="capsule-container">
            {props.capsules.map((capsule, index) => (
                <div key={index}>
                    {capsule}
                </div>
            ))}
        </div>
    )

    return content;
}

export default CapsuleContainer