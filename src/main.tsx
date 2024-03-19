import React from "react";
import ReactDOM from "react-dom/client";
import { routes } from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import store from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={`${import.meta.env.VITE_AUTH0_DOMAIN}`}
      clientId= {`${import.meta.env.VITE_AUTH0_CLIENT_ID}`}
      authorizationParams={{
        redirect_uri: `${import.meta.env.VITE_AUTH0_REDIRECT_URI_F}`,
      }}
      useRefreshTokens={true}
    >
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
