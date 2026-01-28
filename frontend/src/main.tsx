import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { ErrorProvider } from "./context/ErrorContext.tsx";
import { initKeycloak } from "./services/keycloakService.ts";
import { AuthProvider } from "./context/AuthContext.tsx";

initKeycloak();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <AuthProvider>
    <ThemeProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </ThemeProvider>
   </AuthProvider>
  </StrictMode>
);
