
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Edit Project</h1>
      <p className="text-muted-foreground">Modify project with ID: {id}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
          <CardDescription>Update project information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This form will allow you to edit project information for project ID: {id}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProject;
