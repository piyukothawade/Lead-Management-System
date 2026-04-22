import React from "react";
import ReactDOM from "react-dom/client";   // ✅ THIS WAS MISSING
import App from "./app/App.jsx";
import "./app/index.css"

import { ToastProvider } from "./app/features/leads/components/ui/ToastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);