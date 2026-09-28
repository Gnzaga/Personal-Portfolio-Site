import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

/**
 * Flat console panel. The name is historical (this used to be the frosted
 * "glass" card); it now renders a 1px-bordered, blur-free panel and keeps
 * accepting framer-motion props so existing callers don't change.
 * `hoverEffect` is accepted for API compatibility and ignored.
 */
// eslint-disable-next-line no-unused-vars
const GlassCard = ({ children, className, hoverEffect, ...props }) => (
  <motion.div
    className={twMerge('relative bg-panel border border-line rounded-sm p-5', className)}
    {...props}
  >
    {children}
  </motion.div>
);

export default GlassCard;
