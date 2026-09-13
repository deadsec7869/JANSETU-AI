import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('3D WebGL / R3F Subsystem recovered gracefully:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-slate-950/40 rounded-2xl border border-slate-800/60 p-4">
          <div className="text-center space-y-1">
            <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              Civic Intelligence Layer (2D Fallback Mode)
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive 2D telemetry active. WebGL hardware acceleration bypassed.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
