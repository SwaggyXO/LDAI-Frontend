import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { routes } from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, RouterProvider, useNavigate } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Provider, useDispatch } from "react-redux";
import store from "./app/store.ts";
import { useCreateUserMutation } from "./api/userApiSlice.ts";
import { setUser } from "./features/user/userSlice.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={`${import.meta.env.VITE_AUTH0_DOMAIN}`}
      clientId= {`${import.meta.env.VITE_AUTH0_CLIENT_ID}`}
      authorizationParams={{
        redirect_uri: `${import.meta.env.VITE_AUTH0_REDIRECT_URI_F}`,
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
