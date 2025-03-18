
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

interface ConnectionPageLayout {
  description: string;
  children: React.ReactNode;
}

export function ConnectionPageLayout({ description, children }: ConnectionPageLayout) {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-2">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(ROUTES.ADMIN.CONNECTION.INDEX)}
          className="shrink-0"
        >
          View All Connection
        </Button>
      </div>
      <div className="bg-card border rounded-lg shadow-sm">
        {children}
      </div>
    </div>
  );
}
