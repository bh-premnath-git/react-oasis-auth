
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ManageFlow = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Manage Flows</h1>
      <p className="text-muted-foreground">Manage and configure data flows.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Flow Management</CardTitle>
          <CardDescription>Configure and control data flows</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page allows you to manage and configure your data flows.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageFlow;
