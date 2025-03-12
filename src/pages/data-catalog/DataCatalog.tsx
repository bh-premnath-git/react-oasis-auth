
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DataCatalog = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Data Catalog</h1>
      <p className="text-muted-foreground">Browse and explore your data sources.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Catalog Dashboard</CardTitle>
          <CardDescription>Manage and explore your data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main Data Catalog page. From here you can navigate to different data catalog features.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCatalog;
