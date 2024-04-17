import "./softend.scss"
import { Bouncingdot } from '../../components'
import hat from '../../../public/assets/js_files/Hat.json';
import Lottie from "lottie-react"
// A soft ending of the page

const Softend = () => {
  return (
    <div className='learn__softend section__padding'>
        <div className='learn__softend-content gradient__text'>
          <h1 className='learn__softend-content-title'>
            Start Learning With Dot.
          </h1>
          <div className='learn__softend-content__dotvector'>
            {/* <Bouncingdot /> */}
            <Lottie
              style={{ display: "flex", justifyContent: "center", margin: "auto", height: "40vh"}}
              loop={true}
              animationData={hat}
            />
          </div>
        </div>
    </div>
  )
}

export default Softend