
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AddUser = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Add User</h1>
      <p className="text-muted-foreground">Create a new user account</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>Add a new user to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This form will allow you to create a new user account.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;
