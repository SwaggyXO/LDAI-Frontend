import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../containers";
import Lottie from "lottie-react";
import background from "../../assets/js_files/StaryNights.json";
import "./layout.scss";

const animationOptions = {
  animationData: background,
  loop: true,
  autoplay: true,
};

const BackgroundAnimation = () => {
  return <Lottie animationData={background} />;
};

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      {/* <div className="background-animation">
        <Outlet />
        <BackgroundAnimation />
      </div> */}
      <div className="foreground-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
