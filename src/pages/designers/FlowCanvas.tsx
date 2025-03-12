
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FlowCanvas = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Flow Canvas</h1>
      <p className="text-muted-foreground">Flow ID: {id}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Flow Editor</CardTitle>
          <CardDescription>Visual flow editor</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the visual editor for flow {id}. Here you can connect nodes and configure the flow.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlowCanvas;
