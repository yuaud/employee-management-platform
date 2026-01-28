// src/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../services/keycloakService";

type AuthContextType = {
  initialized: boolean;
  authenticated: boolean;
  username?: string;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | undefined>();

  useEffect(() => {
    const syncAuth = () => {
      setAuthenticated(!!keycloak.authenticated);
      setUsername(keycloak.tokenParsed?.preferred_username);
      setInitialized(true);
    };

    // init tamamlandıysa ilk sync
    if (keycloak.authenticated !== undefined) {
      syncAuth();
    }

    // EVENTLER
    keycloak.onAuthSuccess = syncAuth;
    keycloak.onAuthRefreshSuccess = syncAuth;
    keycloak.onAuthLogout = () => {
      setAuthenticated(false);
      setUsername(undefined);
    };

    return () => {
      keycloak.onAuthSuccess = undefined;
      keycloak.onAuthRefreshSuccess = undefined;
      keycloak.onAuthLogout = undefined;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        initialized,
        authenticated,
        username,
        login: () => keycloak.login(),
        logout: () => keycloak.logout(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
