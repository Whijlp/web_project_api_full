import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { BrowserRouter } from "react-router";

import "./index.css";
import App from "../src/components/App";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
