import { MutatingDots } from "react-loader-spinner"
import Evaluating from "../../../public/assets/js_files/Evaluating.json";
import Lottie from "lottie-react";
import { TypeAnimation } from "react-type-animation";

const Loader = () => {
  return (
    <div className="loader" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', gap: '10vh'}}>
        <TypeAnimation
          className="learn__whatlearn-content__typer"
          sequence={["Compiling your results.", 1000, "Looking into textbooks.", 1000, "Searching for keywords.", 1000, "Thinking aggressively.", 1000]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          style={{fontFamily: 'var(--ofont-family)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', paddingTop: '10vh'}}
        />
        <Lottie
          style={{ display: "flex", justifyContent: "center", height: "50vh", width: "50vh", paddingBottom: "10vh"}}
          loop={true}
          animationData={Evaluating}
        />
    </div>
  )
}

export default Loader