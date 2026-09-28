import React from 'react';
import { twMerge } from 'tailwind-merge';

// Kept under its old name for existing consumers. Quiet, square-ish buttons
// with no scale/hover motion; primary is the only filled variant.
const GlassButton = ({ children, onClick, className, variant = 'primary', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm font-mono text-sm transition-colors';

  const variants = {
    primary: 'bg-accent text-paper border border-accent hover:bg-accent/90',
    secondary: 'border border-rule text-ink hover:border-ink',
    outline: 'border border-ink/60 text-ink hover:border-ink',
    ghost: 'text-accent hover:underline',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;
