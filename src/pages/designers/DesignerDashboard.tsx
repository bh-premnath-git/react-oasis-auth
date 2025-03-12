
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DesignerDashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Designer Dashboard</h1>
      <p className="text-muted-foreground">Design and create data pipelines and flows.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Designer Dashboard</CardTitle>
          <CardDescription>Design center for data workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main designer dashboard. From here you can build data pipelines and manage flows.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesignerDashboard;
