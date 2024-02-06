import "./softend.scss"
import { Bouncingdot } from '../../../components/notmain'
// A soft ending of the page

const Softend = () => {
  return (
    <div className='learn__softend section__padding'>
        <div className='learn__softend-content gradient__text'>
          <h1 className='learn__softend-content-title'>
            Start Learning a Course With Dot.
          </h1>
          <div className='learn__softend-content__dotvector'>
            <Bouncingdot />
          </div>
        </div>
    </div>
  )
}

export default Softend