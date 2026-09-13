import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Home, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card variant="glass" className="max-w-md w-full text-center p-8 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">404 - Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested civic intelligence portal route does not exist.
        </p>
        <Button variant="primary" size="md" icon={Home} onClick={() => navigate('/')}>
          Back to Citizen Dashboard
        </Button>
      </Card>
    </div>
  );
};
