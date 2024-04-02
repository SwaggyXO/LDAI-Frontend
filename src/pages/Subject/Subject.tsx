import './subject.scss';

import { useAuth0 } from "@auth0/auth0-react";
import Button from '../../components/buttons/Button';
import Tile from '../../components/Tiles/Tile';
import { useGetUserInfoQuery, useGetUserSubjectsQuery, useUpdateUserInfoMutation } from '../../api/oldUserApiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SubjectsProps = {
    subjects: { id: number, name: string; svg: string }[];
}

type Subject = {
    id: number;
    subjects: string[]
}

const Subject = () => {

    const {isAuthenticated, error, isLoading, user } = useAuth0();

    const [selectedTile, setSelectedTile] = useState<string | null>(null);
    const [subject, setSubject] = useState<string | null>(null);

    const navigate = useNavigate();

    // const { data: userInfoData } = useGetUserInfoQuery();

    // const ciamid = user?.sub;

    // if (!userInfoData) {
    //     return;
    // }

    // const existingUser = userInfoData.find((user) => user["ciamid"] === ciamid);
    // console.log(existingUser);
    // const { data: subjects } = useGetUserSubjectsQuery(existingUser?.grade!);
    // console.log(existingUser?.grade!);
    // console.log(subjects);
    // console.log(subjects![0].id);
    // console.log(subjects![0].subjects);

    // const [updateUserInfo] = useUpdateUserInfoMutation();

    const handleNext = async () => {
        try {
            // const response = await updateUserInfo({
            //   id: existingUser?.id!,
            //   data: { subject: subject }
            // });
            // console.log('User updated successfully:', response);
            navigate("/quiz");
          } catch (error) {
            console.error('Error adding user:', error);
          }
    }

    const handleTileClick = (subject: string) => {
        setSelectedTile(subject); 
        setSubject(subject);
    }

    const content = (
        <div className='parent'>
            <div className="subjects-container">
                {/* {subjects && subjects.map((subject: Subject, idx: number) => (
                    <Tile key={idx} name={subject.name} svg={subject.svg} onClick={() => handleTileClick(subject.name)} selected={selectedTile === subject.name} />
                ))} */}
            </div>
            <div className="button-next_container">
                <Button buttonText="Next" onClick={handleNext} className="button-next" />
            </div>
        </div>
        
    )

    return (
        isAuthenticated && (
            <>
                {error && <p style={{height: "100vh"}}>Authentication Error</p>}
                {!error && isLoading && <p style={{height: "100vh"}}>Loading...</p>}
                {!error && !isLoading && content}
            </>
        )
    )
}

export default Subject