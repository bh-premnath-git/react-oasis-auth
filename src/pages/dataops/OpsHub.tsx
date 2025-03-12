
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const OpsHub = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Operations Hub</h1>
      <p className="text-muted-foreground">Monitor and manage running operations.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Operations Center</CardTitle>
          <CardDescription>Real-time operations monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page allows you to monitor and manage your running data operations in real-time.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpsHub;
