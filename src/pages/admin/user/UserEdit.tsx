
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Edit User</h1>
      <p className="text-muted-foreground">Modify user account with ID: {id}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>Update user information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This form will allow you to edit user information for user ID: {id}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUser;
