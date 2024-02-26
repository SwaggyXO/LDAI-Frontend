import { useAuth0 } from "@auth0/auth0-react"
import './grade.scss'
import GradeCateg from "../../containers/GradeCateg/GradeCateg";
import Button from "../../components/buttons/Button";
import Tile from "../../components/Tiles/Tile";

const Grade = () => {

  const {isAuthenticated, error, isLoading } = useAuth0();

  const handleNext = () => {

  }

  const midSchoolArr = [6, 7, 8];
  const midSchoolTiles = midSchoolArr.map((grade, index) => (
    <Tile key={index} number={grade} />
  ));

  const secSchoolArr = [9, 10];
  const secSchoolTiles = secSchoolArr.map((grade, index) => (
    <Tile key={index} number={grade} />
  ));

  const senSecSchoolArr = [11, 12];
  const senSecSchoolTiles = senSecSchoolArr.map((grade, index) => (
    <Tile key={index} number={grade} />
  ));

  const content = (
    <>
      <div className="grade--categories">
        <GradeCateg heading="Middle School" tiles={midSchoolTiles}/>
        <GradeCateg heading="Secondary School" tiles={secSchoolTiles}/>
        <GradeCateg heading="Senior Secondary School" tiles={senSecSchoolTiles}/>
      </div>
      <div className="button-next_container">
        <Button buttonText="Next" onClick={handleNext} className="button-next" to="/subject"/>
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