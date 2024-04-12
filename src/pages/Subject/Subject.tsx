import './subject.scss';

import { useAuth0 } from "@auth0/auth0-react";
import Button from '../../components/buttons/Button';
import Tile from '../../components/Tiles/Tile';
import { useGetUserInfoQuery, useGetUserSubjectsQuery, useUpdateUserInfoMutation } from '../../api/oldUserApiSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchSubjectsByGradeQuery } from '../../api/subjectApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import renderContent from '../../features/content/renderContent';
import { useUpdateUserMutation } from '../../api/userApiSlice';
import { setUser } from '../../features/user/userSlice';

type SubjectsProps = {
    subjects: { id: number, name: string; svg: string }[];
}

interface Subject {
    name: string;
    description: string;
    grade: string;
    imageUrl: string;
  }

const Subject = () => {

    const {isAuthenticated, error, isLoading, user } = useAuth0();

    const currUser = useSelector((state: RootState) => state.user);

    const [selectedTile, setSelectedTile] = useState<string | null>(null);
    const [selected, setSelected] = useState<boolean>(true);
    const [subject, setSubject] = useState<string | null>(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [updateUserMutation] = useUpdateUserMutation();

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

    const { data: subjectsData, error: fetchSubjectsError, isLoading: isFetchSubjectsLoading } = useFetchSubjectsByGradeQuery(currUser.grade!);

    const subjects = subjectsData?.data;

    useEffect(() => {
        console.log(subjectsData?.data);
    }, [subjectsData]);


    const handleNext = async () => {
        try {
            // const response = await updateUserInfo({
            //   id: existingUser?.id!,
            //   data: { subject: subject }
            // });
            // console.log('User updated successfully:', response);

            const response = await updateUserMutation({
                ciamId: user?.sub,
                subjectId: subject,
            });
            if ('error' in response) {
                console.error("An error occured", response);
            } else {
                console.log('User updated successfully:', response);
                dispatch(setUser(response.data.data.data));
                navigate("/home");
            }
              
          } catch (error) {
            console.error('Error adding user:', error);
          }
    }

    const handleTileClick = (subject: string) => {
        setSelectedTile(subject); 
        setSelected(false);
        setSubject(subject);
    }

    const content = (
        <div className='parent'>
            <div className="subjects-container">
                {subjects && subjects.map((subject: Subject, idx: number) => (
                    <Tile key={idx} name={subject.name} subjectSvg={true} onClick={() => handleTileClick(subject.name)} selected={selectedTile === subject.name} />
                ))}
            </div>
            <div className="button-next_container">
                <Button buttonText="Next" onClick={handleNext} className="button-next" check={selected}/>
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