import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./router/index.js";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/index.js";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <CookiesProvider>
      <RouterProvider router={Router} />
    </CookiesProvider>
  </Provider>
  // </React.StrictMode>
);
