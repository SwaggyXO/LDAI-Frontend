import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../containers";
import Lottie from "lottie-react";
import background from "../../assets/js_files/StaryNights.json";
import "./layout.scss"; // Assuming this is the name of your SCSS file

const animationOptions = {
  animationData: background,
  loop: true,
  autoplay: true,
};

// const BackgroundAnimation = () => {
//   return </>;
// };

const Layout = () => {
  return (
    <div className="layout-container">
      <Header/>
      <div className="foreground-content">
        <Lottie className="background-animation" animationData={background} />
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
