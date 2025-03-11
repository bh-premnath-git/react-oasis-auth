
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useState } from "react";
import { ClipboardCopy, RefreshCw, Shield } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { token, getAuthHeaders, getUserInfo } = useAuth();
  const [showToken, setShowToken] = useState(false);
  const userInfo = getUserInfo();

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      toast.success("Token copied to clipboard");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="page-transition min-h-screen px-4 py-8 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your secure dashboard
          </p>
        </motion.div>

        <Separator />

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" /> 
                User Information
              </CardTitle>
              <CardDescription>
                Your Keycloak authentication details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userInfo && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Username:</span>
                    <span className="text-sm">{userInfo.username}</span>
                  </div>
                  {userInfo.email && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Email:</span>
                      <span className="text-sm">{userInfo.email}</span>
                    </div>
                  )}
                  {userInfo.name && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Full Name:</span>
                      <span className="text-sm">{userInfo.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Roles:</span>
                    <span className="text-sm">{userInfo.roles.join(", ")}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5" />
                Authentication Token
              </CardTitle>
              <CardDescription>
                Your Bearer token is stored in sessionStorage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-md overflow-hidden">
                  <pre className="text-sm whitespace-pre-wrap break-all">
                    {showToken 
                      ? token?.substring(0, 200) + "..." 
                      : "••••••••••••••••••••••••••••••••••"}
                  </pre>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? "Hide Token" : "Show Token"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={copyToken}
                className="flex items-center"
              >
                <ClipboardCopy className="mr-2 h-3 w-3" />
                Copy Token
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>API Request Helper</CardTitle>
              <CardDescription>
                Use this format to make authenticated requests to your backend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
{`// Example of an authenticated API request
const fetchData = async () => {
  const response = await fetch('https://your-api.com/data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${token ? '...' : 'your-token'}'
    }
  });
  const data = await response.json();
  return data;
};`}
              </pre>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
