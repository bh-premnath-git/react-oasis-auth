
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Projects = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Project Management</h1>
      <p className="text-muted-foreground">View and manage all projects</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Project management console</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page allows you to view and manage all projects in the system.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
