
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AddEnvironment = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Add Environment</h1>
      <p className="text-muted-foreground">Create a new environment</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Create Environment</CardTitle>
          <CardDescription>Add a new environment to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This form will allow you to create a new environment.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEnvironment;
