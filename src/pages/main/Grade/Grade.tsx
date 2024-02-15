import { useAuth0 } from "@auth0/auth0-react"
import './grade.scss'
import BackButton from "../../../components/main/buttons/BackButton";
import Topnav from "../../../containers/main/Topnav/Topnav";
import GradeCateg from "../../../containers/main/GradeCateg/GradeCateg";
import Tiles from "../../../components/main/Tiles/Tiles";
import Button from "../../../components/main/buttons/Button";

const Grade = () => {

  const {isAuthenticated, error, isLoading } = useAuth0();

  const handleNext = () => {

  }

  const midSchoolArr = [6, 7, 8];
  const midSchoolTiles = midSchoolArr.map((grade, index) => (
    <Tiles key={index} number={grade} />
  ));

  const secSchoolArr = [9, 10];
  const secSchoolTiles = secSchoolArr.map((grade, index) => (
    <Tiles key={index} number={grade} />
  ));

  const senSecSchoolArr = [11, 12];
  const senSecSchoolTiles = senSecSchoolArr.map((grade, index) => (
    <Tiles key={index} number={grade} />
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
      <div>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && content}
      </div>
    )
  )
}

export default Grade