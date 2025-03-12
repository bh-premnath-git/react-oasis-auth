
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Environment = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Environment Management</h1>
      <p className="text-muted-foreground">View and manage all environments</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Environments</CardTitle>
          <CardDescription>Environment management console</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page allows you to view and manage all environments in the system.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Environment;
