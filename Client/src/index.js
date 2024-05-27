import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./../src/Model/context/context.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Context/AuthProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
