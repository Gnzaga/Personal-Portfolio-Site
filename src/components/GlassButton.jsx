import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Flat console button (historical name). No scale-on-hover: state changes
 * are border/text colour only, 100ms.
 */
const variants = {
  primary: 'border-signal/60 text-signal hover:bg-signal/10',
  secondary: 'border-line-strong text-fg hover:border-signal hover:text-signal',
  outline: 'border-line-strong text-fg hover:border-signal hover:text-signal',
  ghost: 'border-transparent text-mute hover:text-fg',
};

const GlassButton = ({ children, onClick, className, variant = 'primary', ...props }) => (
  <button
    type="button"
    onClick={onClick}
    className={twMerge(
      'inline-flex items-center justify-center gap-2 border bg-panel px-3 py-2 font-mono text-xs rounded-sm transition-colors duration-100',
      variants[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default GlassButton;
