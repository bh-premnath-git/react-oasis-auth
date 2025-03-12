
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Users = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">User Management</h1>
      <p className="text-muted-foreground">View and manage all users.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>User management console</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page allows you to view and manage all users in the system.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
