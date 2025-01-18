import { Loader } from 'lucide-react';
import React from 'react';

const LoadinComponent = ({ dataName }: { dataName: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader className="w-12 h-12 animate-spin text-primary" />
      <p className="text-muted-foreground">Loading {dataName} data...</p>
    </div>
  );
};

export default LoadinComponent;
