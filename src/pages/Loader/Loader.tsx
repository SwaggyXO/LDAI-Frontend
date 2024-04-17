import { MutatingDots } from "react-loader-spinner"
import loader from "../../../public/assets/js_files/Loader.json";
import Lottie from "lottie-react";

const Loader = () => {
  return (
    <div className="loader" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        {/* <MutatingDots 
            visible={true}
            width="100"
            color="#03045E"
            secondaryColor="#0077B6"
            radius="15"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            wrapperClass="mutating-dots"
        /> */}
        <Lottie
          style={{ display: "flex", justifyContent: "center", height: "60vh", width: "40vh", paddingBottom: "10vh"}}
          loop={true}
          animationData={loader}
        />
    </div>
  )
}

export default Loader