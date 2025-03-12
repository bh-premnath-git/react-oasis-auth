
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AlertsHub = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Alerts Hub</h1>
      <p className="text-muted-foreground">Monitor and manage alerts for your data pipelines</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Alerts Hub</CardTitle>
          <CardDescription>Monitor critical data pipeline alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page will display alerts and notifications from your data pipelines.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsHub;
