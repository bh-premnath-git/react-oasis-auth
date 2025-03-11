
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const Profile = () => {
  const { getUserInfo } = useAuth();
  const userInfo = getUserInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold">User Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>

      {userInfo && (
        <Card className="glass-panel">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{userInfo.username}</p>
              </div>
              
              {userInfo.email && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{userInfo.email}</p>
                </div>
              )}
              
              {userInfo.name && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{userInfo.name}</p>
                </div>
              )}
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Roles</p>
                <div className="flex flex-wrap gap-2">
                  {userInfo.roles.map((role: string) => (
                    <span key={role} className="px-2 py-1 bg-primary/10 rounded-md text-xs">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default Profile;
