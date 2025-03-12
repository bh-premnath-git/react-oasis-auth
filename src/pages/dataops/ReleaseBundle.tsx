
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ReleaseBundle = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Release Bundle</h1>
      <p className="text-muted-foreground">Manage and deploy release bundles</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Release Management</CardTitle>
          <CardDescription>Package and release your data pipelines</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page allows you to create and manage release bundles for your data pipelines.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseBundle;
