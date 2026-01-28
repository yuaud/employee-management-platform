CREATE DATABASE employeemanagementdb;

CREATE USER api WITH PASSWORD 'api_pw';

GRANT ALL PRIVILEGES ON DATABASE employeemanagementdb TO api;

\c employeemanagementdb
GRANT USAGE, CREATE ON SCHEMA public TO api;
ALTER SCHEMA public OWNER TO api;


