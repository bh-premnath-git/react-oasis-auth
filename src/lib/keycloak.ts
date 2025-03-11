
import Keycloak from 'keycloak-js';

/**
 * Initialize a Keycloak instance using environment variables
 */
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080/', 
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'bighammer-realm',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'bighammer-ui',
};

console.log('Keycloak configuration:', keycloakConfig);

// Create Keycloak instance
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
