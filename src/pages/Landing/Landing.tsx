import { Features, Login, Whatlearn, Softend } from "../../containers";
import background from "../../assets/js_files/StaryNights.json";

import { Dotcomma } from "../../components";

import "./landing.scss";
import Lottie from "lottie-react";

const Landing = () => {
  let content = (
    <>
      <Dotcomma />
      <Whatlearn />
      <Login />
      <Features />
      <Softend />
    </>
  );

  return (
    <div className="landing foreground-content">
      <div>
        <Lottie className="background-animation" animationData={background} />
        {content}
      </div>
    </div>
  );
};

export default Landing;
