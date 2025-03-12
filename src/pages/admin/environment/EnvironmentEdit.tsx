
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const EditEnvironment = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Edit Environment</h1>
      <p className="text-muted-foreground">Modify environment with ID: {id}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Environment</CardTitle>
          <CardDescription>Update environment information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This form will allow you to edit environment information for environment ID: {id}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEnvironment;
