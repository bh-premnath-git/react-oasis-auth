
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DatasourceImport = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Import Data Source</h1>
      <p className="text-muted-foreground">Add new data sources to your catalog.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Source Import</CardTitle>
          <CardDescription>Connect to new data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page allows you to import and connect to new data sources for your catalog.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatasourceImport;
