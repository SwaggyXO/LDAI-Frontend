import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './quizexcerpt.scss';

type QuizProps = {
    quiz: { name: string, mode: string, subject: string }
}

const QuizExcerpt = (props: QuizProps) => {
    
    const quiz = props.quiz;
    const name = quiz.name;
    const mode = quiz.mode;
    const subject = quiz.subject;

    const playButton = (
        <Button buttonText={<FontAwesomeIcon icon={faPlay} color='white' />} className="quiz-play_button" to="/grade" />
    )

    const content = (
        <div className='quiz-excerpt'>
            <p>{name}</p>
            <p>{mode}</p>
            <p>{subject}</p>
            {playButton}
        </div>
    )
    
    return content;
}

export default QuizExcerpt