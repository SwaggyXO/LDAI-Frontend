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

const Layout = () => {
  return (
    <div className="layout-container">
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
