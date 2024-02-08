import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./pages/Auth/Login.tsx";
import Home from "./pages/Home/Home.tsx";
import Profile from "./pages/Profile/Profile.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={`${import.meta.env.VITE_AUTH0_DOMAIN}`}
      clientId= {`${import.meta.env.VITE_AUTH0_CLIENT_ID}`}
      authorizationParams={{
        redirect_uri: `${import.meta.env.VITE_AUTH0_REDIRECT_URI}`,
      }}
    >
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);
