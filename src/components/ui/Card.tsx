import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive' | 'glowing' | 'subtle';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl shadow-xl',
    glass: 'bg-slate-900/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700/80 rounded-2xl shadow-xl text-slate-100 transition-all duration-200',
    interactive: 'bg-slate-900/70 hover:bg-slate-850/80 backdrop-blur-xl border border-slate-800 hover:border-brand-500/40 rounded-2xl shadow-xl hover:shadow-glow-cyan text-slate-100 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5',
    glowing: 'bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-brand-500/30 rounded-2xl shadow-glow-cyan text-slate-100 backdrop-blur-xl',
    subtle: 'bg-slate-900/30 border border-slate-800/50 rounded-xl text-slate-200',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 sm:p-6 pb-3 sm:pb-4 border-b border-slate-800/50 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`text-lg font-semibold tracking-tight text-white flex items-center gap-2 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`text-sm text-slate-400 mt-1 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 sm:p-6 pt-3 sm:pt-4 border-t border-slate-800/50 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);
