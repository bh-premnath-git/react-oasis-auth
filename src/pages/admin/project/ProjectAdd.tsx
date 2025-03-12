
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AddProject = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Add Project</h1>
      <p className="text-muted-foreground">Create a new project</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>Add a new project to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This form will allow you to create a new project.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProject;
