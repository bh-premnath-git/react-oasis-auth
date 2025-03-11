
import Keycloak from 'keycloak-js';

/**
 * Initialize a Keycloak instance
 * Replace these values with your actual Keycloak server details
 */
const keycloakConfig = {
  url: 'http://localhost:8180/', // Replace with your Keycloak server URL
  realm: 'myrealm', // Replace with your realm
  clientId: 'myclient', // Replace with your client ID
};

// Create Keycloak instance
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
