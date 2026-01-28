// src/auth/ProtectedLayout.tsx
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedLayout() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    window.dispatchEvent(
      new CustomEvent("api-error", {
        detail: {
          message: "Unauthorized request, please login first.",
          status: 401,
          type: "error"
        }
      })
     )
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
