import Keycloak, { KeycloakConfig } from 'keycloak-js';

// Only initialize Keycloak in the browser environment
let keycloak: Keycloak;

// Check if we're running in a browser environment
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  const keycloakConfig: KeycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL, 
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  };

  console.log('Keycloak configuration : >>', keycloakConfig);
  keycloak = new Keycloak(keycloakConfig);
} else {
  // Create a mock Keycloak instance for server-side rendering
  console.log('Server-side environment detected, creating a mock Keycloak instance');
  keycloak = {} as Keycloak;
}

export default keycloak;
