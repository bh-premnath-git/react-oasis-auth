
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AddConnection = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Add Connection</h1>
      <p className="text-muted-foreground">Create a new connection</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Create Connection</CardTitle>
          <CardDescription>Add a new connection to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This form will allow you to create a new connection.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddConnection;
