
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Admin Console</h1>
      <p className="text-muted-foreground">Manage users, projects, environments, and connections.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Central administration portal</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the admin console dashboard. From here you can manage users, projects, environments, and connections.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
