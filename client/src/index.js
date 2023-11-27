import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./router/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={Router} />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
