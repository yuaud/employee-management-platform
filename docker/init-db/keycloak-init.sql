-- Keycloak Database
CREATE DATABASE keycloakdb;

CREATE USER keycloak WITH PASSWORD 'keycloak_pw';
GRANT ALL PRIVILEGES ON DATABASE keycloakdb TO keycloak;

\c keycloakdb
GRANT USAGE, CREATE ON SCHEMA public TO keycloak;
ALTER SCHEMA public OWNER TO keycloak