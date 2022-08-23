import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import Header from './components/Header'
import Footer from './components/Footer'
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <>
      <App />
    </>
  </StrictMode>
);