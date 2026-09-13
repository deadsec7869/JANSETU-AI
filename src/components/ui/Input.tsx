import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-slate-900/90 border ${
            error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-800 focus:border-brand-500 focus:ring-brand-500/20'
          } rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 ${
            icon ? 'pl-10' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1.5">{helperText}</p>}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`w-full bg-slate-900/90 border ${
          error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-800 focus:border-brand-500 focus:ring-brand-500/20'
        } rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1.5">{helperText}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  helperText,
  error,
  options,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
          {label}
        </label>
      )}
      <select
        id={inputId}
        className={`w-full bg-slate-900/90 border ${
          error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-800 focus:border-brand-500 focus:ring-brand-500/20'
        } rounded-xl px-4 py-3 text-sm text-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1.5">{helperText}</p>}
    </div>
  );
};
