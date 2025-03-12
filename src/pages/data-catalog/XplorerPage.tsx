
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const XplorerPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Data Xplorer</h1>
      <p className="text-muted-foreground">Explore and analyze your data visually.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Xplorer</CardTitle>
          <CardDescription>Interactive data exploration tool</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The Data Xplorer allows you to interactively explore and visualize your data sources.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default XplorerPage;
