import { TypeAnimation } from "react-type-animation"

import "./whatlearn.scss"
// Flavour text for the very first section of the landing page

const Whatlearn = () => {

  return (
    <div className='learn__whatlearn section__padding'>
        <p className='learn__whatlearn-content'>
          Empowering minds through 
          <br />
          <TypeAnimation
          className='learn__whatlearn-content__typer'
          sequence={['EXPLORATION.', 1000, 'REASONING.', 1000, 'GROWTH.', 1000]}
          wrapper='span'
          speed={50}
          repeat={Infinity}
          />
          <br />
          Its your learning journey after all.
        </p>
    </div>
  )
}

export default Whatlearn