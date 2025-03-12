
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BuildDataPipeline = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Build Data Pipeline</h1>
      <p className="text-muted-foreground">Create and configure data pipelines.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Pipeline Builder</CardTitle>
          <CardDescription>Create and edit data pipelines</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page allows you to build and configure data pipelines for your projects.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildDataPipeline;
