import { useNavigate } from "react-router-dom";
import renderContent from "../../features/content/renderContent";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import './modeexcerpt.scss';

type Mode = {
    imgText: string;
    title: string;
    description: string;
    time: number;
    questions: number;
}

type ModeExcerptProps = {
    mode: Mode;
}

const ModeExcerpt = (props: ModeExcerptProps) => {

    const { mode } = props;

    const navigate = useNavigate();

    const handleOnModeClick = (url: string) => {
        navigate(url);
        window.scrollTo(0, 0);
    }

    const playButton = (
        <Button buttonText={<FontAwesomeIcon icon={faPlay} color='white' />} className="quiz-play_button" />
    )

    const content = (
        <div className='mode-excerpt' onClick={() => handleOnModeClick(`/unrated/${mode.imgText.toLowerCase()}`)}>
            <div className="mode-image">
                {renderContent('app', 'Modes', `${mode.imgText}`)}
            </div>
            <div className="mode-info">
                <p>{mode.title}</p>
                <p>{mode.description}</p>
            </div>
            <div className="play-button">{playButton}</div>
        </div>
    );

    return content;
}

export default ModeExcerpt