
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectOperations = () => {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cliq Project Operations</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b py-4">
            <CardTitle className="text-lg">Project Operations</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Project operations content will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectOperations;
