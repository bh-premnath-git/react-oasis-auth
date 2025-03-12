
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const EditConnection = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Edit Connection</h1>
      <p className="text-muted-foreground">Modify connection with ID: {id}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Connection</CardTitle>
          <CardDescription>Update connection information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This form will allow you to edit connection information for connection ID: {id}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditConnection;
