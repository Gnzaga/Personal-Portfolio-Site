import React from 'react';
import { twMerge } from 'tailwind-merge';

// Kept under its old name for the remaining consumer (PathfindingDemo).
// In the editorial system a "card" is just a hairline-bordered block.
const GlassCard = ({ children, className, hoverEffect, ...props }) => (
  <div
    className={twMerge('relative border border-rule rounded-sm p-6', className)}
    {...props}
  >
    {children}
  </div>
);

export default GlassCard;
