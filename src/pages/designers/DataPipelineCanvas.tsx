
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DataPipelineCanvas = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Pipeline Canvas</h1>
      <p className="text-muted-foreground">Pipeline ID: {id}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Pipeline Canvas</CardTitle>
          <CardDescription>Visual pipeline editor</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the visual editor for pipeline {id}. Here you can connect nodes and configure the pipeline flow.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPipelineCanvas;
