import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM_NAME,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
});

export const initKeycloak = () => {
    return keycloak.init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        checkLoginIframe: false,
    });
};

keycloak.onTokenExpired = () => {
  keycloak
    .updateToken(30)
    .catch(() => {
      keycloak.logout();
    });
};

export const getToken = () => keycloak.token;

export const getParsedToken = () => keycloak.tokenParsed;

export const login = () => keycloak.login();
export const logout = () => keycloak.logout({
    redirectUri: window.location.origin
});

export const hasRole = (role:string): boolean => {
    return keycloak.hasRealmRole(role);
}

export default keycloak;