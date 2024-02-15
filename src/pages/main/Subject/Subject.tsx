import './subject.scss';

import { useAuth0 } from "@auth0/auth0-react";
import SubjectTile from "../../../components/main/Tiles/SubjectTile/SubjectTile";
import Button from "../../../components/main/buttons/Button";

type SubjectsProps = {
    subjects: { id: number, name: string; svg: string }[];
}

const Subject = (props: SubjectsProps) => {

    const subjects = props.subjects;

    const {isAuthenticated, error, isLoading } = useAuth0();

    const handleNext = () => {

    }

    const content = (
        <div className='parent'>
            <div className="subjects-container">
                {subjects.map((subject) => (
                    <SubjectTile key={subject.id} name={subject.name} svg={subject.svg} />
                ))}
            </div>
            <div className="button-next_container">
                <Button buttonText="Next" onClick={handleNext} className="button-next" to="/home"/>
            </div>
        </div>
        
    )

    return (
        isAuthenticated && (
            <>
                {error && <p>Authentication Error</p>}
                {!error && isLoading && <p>Loading...</p>}
                {!error && !isLoading && content}
            </>
        )
    )
}

export default Subject