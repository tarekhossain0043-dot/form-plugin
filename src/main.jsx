import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const adminRoot = document.getElementById("react-admin-form");

if (adminRoot) {
  createRoot(adminRoot).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}
