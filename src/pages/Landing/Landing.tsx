import { Features, Login, Whatlearn, Softend } from "../../containers";
import background from "../../assets/js_files/StaryNights.json";
import Lottie from "lottie-react";
import { Dotcomma } from "../../components";
import "./landing.scss";

const animationOptions = {
  animationData: background,
  loop: true,
  autoplay: true,
};

const BackgroundAnimation = () => {
  return <Lottie className="bg" animationData={background} />;
};
const BackgroundAnimation2 = () => {
  return <Lottie className="bg-2" animationData={background} />;
};
const BackgroundAnimation3 = () => {
  return <Lottie className="bg-3" animationData={background} />;
};

const Landing = () => {
  let content = (
    <>
      <BackgroundAnimation />
      <BackgroundAnimation2 />
      <BackgroundAnimation3 />

      <Dotcomma />
      {/* <BackgroundAnimation /> */}
      <Whatlearn />
      {/* <BackgroundAnimation /> */}
      <Login />
      {/* <BackgroundAnimation /> */}
      <Features />
      {/* <BackgroundAnimation /> */}
      <Softend />
      {/* <BackgroundAnimation /> */}
    </>
  );

  return <div className="landing">{content}</div>;
};

export default Landing;
