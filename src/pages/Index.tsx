
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { isAuthenticated, login } = useAuth();

  return (
    <div className="page-transition min-h-screen flex flex-col px-4 sm:px-6 lg:px-8">
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
              Keycloak Authentication Demo
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Secure authentication with <span className="text-primary">Keycloak</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A beautifully designed React application with Keycloak authentication, session storage, and secure routes.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {isAuthenticated ? (
              <Button asChild size="lg" className="glass-button">
                <Link to="/dashboard">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button onClick={login} size="lg" className="glass-button">
                Sign in with Keycloak
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </motion.div>

          <motion.div 
            className="glass-panel p-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background/50 border">
                <h3 className="font-medium">Secure Authentication</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Enterprise-grade security with Keycloak
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border">
                <h3 className="font-medium">Session Management</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Persistent sessions with auto-refresh
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border">
                <h3 className="font-medium">Protected Routes</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Access control for sensitive resources
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
