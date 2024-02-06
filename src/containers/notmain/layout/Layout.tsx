import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../notmain";

const Layout = () => {

  const content = (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )

  return content;
}

export default Layout