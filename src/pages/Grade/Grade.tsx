import { useAuth0 } from "@auth0/auth0-react"
import './grade.scss'
import GradeCateg from "../../containers/GradeCateg/GradeCateg";
import Button from "../../components/buttons/Button";
import Tile from "../../components/Tiles/Tile";
import { useState } from "react";
import { useGetUserInfoQuery, useUpdateUserInfoMutation } from "../../api/oldUserApiSlice";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../api/userApiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";

const Grade = () => {

  const {isAuthenticated, error, isLoading, user } = useAuth0();

  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [selected, setSelected] = useState<boolean>(true);
  const [grade, setGrade] = useState<number | null>(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [updateUserMutation] = useUpdateUserMutation();

  // const [updateUserInfo] = useUpdateUserInfoMutation();

  // const { data: userInfoData } = useGetUserInfoQuery();

  const handleNext = async () => {
    try {
      // const ciamid = user?.sub;
      
      // if (!userInfoData) {
      //   return;
      // }

      // const existingUser = userInfoData.find((user) => user["ciamid"] === ciamid);

      const response = await updateUserMutation({
        ciamId: user?.sub,
        grade: grade?.toString(),
        marbles: 0,
        xp: 0,
        streak: 0,
        isNew: true,
      });
      console.log('User updated successfully:', response);
      dispatch(setUser(response.data.data));
      navigate("/subject");
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const handleTileClick = (grade: number) => {
    setSelectedTile(grade); 
    setSelected(false);
    setGrade(grade);
  }

  const midSchoolArr = [6, 7, 8];
  const midSchoolTiles = midSchoolArr.map((grade, index) => (
    <Tile key={index} number={grade} onClick={() => handleTileClick(grade)} selected={selectedTile === grade} />
  ));

  const secSchoolArr = [9, 10];
  const secSchoolTiles = secSchoolArr.map((grade, index) => (
    <Tile key={index} number={grade} onClick={() => handleTileClick(grade)} selected={selectedTile === grade} />
  ));

  const senSecSchoolArr = [11, 12];
  const senSecSchoolTiles = senSecSchoolArr.map((grade, index) => (
    <Tile key={index} number={grade} onClick={() => handleTileClick(grade)} selected={selectedTile === grade} />
  ));

  const content = (
    <>
      <div className="grade--categories">
        <GradeCateg heading="Middle School" tiles={midSchoolTiles}/>
        <GradeCateg heading="Secondary School" tiles={secSchoolTiles}/>
        <GradeCateg heading="Senior Secondary School" tiles={senSecSchoolTiles}/>
      </div>
      <div className="button-next_container">
        <Button buttonText="Next" onClick={handleNext} className="button-next" check={selected}/>
      </div>
    </>
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

export default Grade