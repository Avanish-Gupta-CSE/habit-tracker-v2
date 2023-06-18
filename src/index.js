import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HabitProvider } from "./context/HabitContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HabitProvider>
        <App />
      </HabitProvider>
    </BrowserRouter>
  </React.StrictMode>
);
