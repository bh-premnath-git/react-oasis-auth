
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DataOpsHub = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">DataOps Hub</h1>
      <p className="text-muted-foreground">Manage and monitor your data operations.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>DataOps Dashboard</CardTitle>
          <CardDescription>Central operations dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main DataOps hub for monitoring and managing data operations.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataOpsHub;
