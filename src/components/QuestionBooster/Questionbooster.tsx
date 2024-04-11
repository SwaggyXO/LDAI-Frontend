import { Booster } from "../../api/gameApiSlice"
import renderContent from "../../features/content/renderContent"

type PropsType = {
    booster: Booster
}

const Questionbooster = (props: PropsType) => {

    const booster = props.booster;

    const content = (
        <div className="question--booster_item">
            <div className="booster-quantity">0</div>
            <div className="booster-ellipse">{renderContent('boosters', `${booster.name}`, `${booster.name}`)}</div>
        </div>
    )

    return content;
}

export default Questionbooster