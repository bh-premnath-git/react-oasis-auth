
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Connection = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Connection Management</h1>
      <p className="text-muted-foreground">View and manage all connections</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Connections</CardTitle>
          <CardDescription>Connection management console</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page allows you to view and manage all connections in the system.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Connection;
