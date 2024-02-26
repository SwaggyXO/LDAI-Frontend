import './subject.scss';

import { useAuth0 } from "@auth0/auth0-react";
import Button from '../../components/buttons/Button';
import Tile from '../../components/Tiles/Tile';

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
                    <Tile key={subject.id} name={subject.name} svg={subject.svg} />
                ))}
            </div>
            <div className="button-next_container">
                <Button buttonText="Next" onClick={handleNext} className="button-next" to="/quiz"/>
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