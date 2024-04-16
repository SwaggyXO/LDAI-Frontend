import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './quizexcerpt.scss';
import { Quiz } from "../../api/quizApiSlice";

type QuizProps = {
    quiz: Quiz
}

const QuizExcerpt = (props: QuizProps) => {
    
    const quiz = props.quiz;

    const name = quiz.title;
    const mode = quiz.quizType.charAt(0) + quiz.quizType.slice(1).toLowerCase();
    const subject = quiz.subject.charAt(0).toUpperCase() + quiz.subject.slice(1);

    const playButton = (
        <Button buttonText={<FontAwesomeIcon icon={faPlay} color='white' />} className="quiz-play_button" />
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