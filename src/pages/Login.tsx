
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { isAuthenticated, isInitialized, login } = useAuth();
  const location = useLocation();
  
  // Get the intended destination from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";
  
  // Redirect to the original destination if already authenticated
  if (isAuthenticated && isInitialized) {
    return <Navigate to={from} replace />;
  }
  
  // Show loading state while Keycloak initializes
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 max-w-md w-full text-center"
      >
        <h1 className="text-2xl font-bold mb-6">Authentication Required</h1>
        <p className="text-muted-foreground mb-8">
          Please log in to access this application
        </p>
        
        <Button 
          onClick={login} 
          size="lg" 
          className="glass-button w-full"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Sign in with Keycloak
        </Button>
      </motion.div>
    </div>
  );
};

export default Login;
