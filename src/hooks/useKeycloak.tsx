
import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from 'react';
import keycloak from '@/lib/keycloak';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Define the context type
type KeycloakContextType = {
  initialized: boolean;
  authenticated: boolean;
  keycloak: typeof keycloak;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  token: string | undefined;
  refreshToken: string | undefined;
};

// Create a context to share Keycloak state
const KeycloakContext = createContext<KeycloakContextType | undefined>(undefined);

// Provider component to wrap around the app
export const KeycloakProvider = ({ children }: { children: ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined);

  // Get redirect URI from environment variables or use current origin
  const redirectUri = import.meta.env.VITE_KEYCLOAK_REDIRECT_URI || window.location.origin;

  // Initialize Keycloak
  useEffect(() => {
    const initKeycloak = async () => {
      try {
        console.log('Initializing Keycloak with redirectUri:', redirectUri);
        
        const authenticated = await keycloak.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          pkceMethod: 'S256',
          redirectUri,
          checkLoginIframe: false, // Disable login iframe checking
        });

        console.log('Keycloak initialized, authenticated:', authenticated);
        setInitialized(true);
        setAuthenticated(authenticated);
        
        if (authenticated) {
          console.log('User is authenticated, token available:', !!keycloak.token);
          setToken(keycloak.token);
          setRefreshToken(keycloak.refreshToken);
          
          // Save token to sessionStorage
          sessionStorage.setItem('kc_token', keycloak.token || '');
          sessionStorage.setItem('kc_refreshToken', keycloak.refreshToken || '');
          
          // Set up token refresh
          keycloak.onTokenExpired = () => {
            console.log('Token expired, refreshing...');
            keycloak.updateToken(30).then((refreshed) => {
              if (refreshed) {
                console.log('Token refreshed');
                setToken(keycloak.token);
                setRefreshToken(keycloak.refreshToken);
                sessionStorage.setItem('kc_token', keycloak.token || '');
                sessionStorage.setItem('kc_refreshToken', keycloak.refreshToken || '');
              }
            }).catch((error) => {
              console.error('Failed to refresh token:', error);
              // Force re-login
              logout();
            });
          };
        }
      } catch (error) {
        console.error('Keycloak initialization error:', error);
        toast.error('Failed to connect to authentication service');
        setInitialized(true);
      }
    };

    initKeycloak();

    return () => {
      // Clean up event listeners
      keycloak.onTokenExpired = undefined;
    };
  }, [redirectUri]);

  // Login function
  const login = useCallback(async () => {
    try {
      await keycloak.login({
        redirectUri,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  }, [redirectUri]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      sessionStorage.removeItem('kc_token');
      sessionStorage.removeItem('kc_refreshToken');
      setToken(undefined);
      setRefreshToken(undefined);
      setAuthenticated(false);
      await keycloak.logout({
        redirectUri,
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  }, [redirectUri]);

  return (
    <KeycloakContext.Provider value={{
      initialized,
      authenticated,
      keycloak,
      login,
      logout,
      token,
      refreshToken
    }}>
      {children}
    </KeycloakContext.Provider>
  );
};

// Hook to use the Keycloak context
export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (context === undefined) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }
  return context;
};
