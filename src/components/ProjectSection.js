import React from 'react';

/**
 * A section of a case study: serif heading over a hairline, then the
 * reading column. Every page under src/pages/projects/ is built from these.
 * `icon` is still accepted for compatibility but no longer rendered.
 *
 * @param {string} title - The title of the section.
 * @param {React.ReactNode} children - The content of the section.
 */
const ProjectSection = ({ title, icon, children }) => (
  <section className="border-t border-rule pt-8 mt-12">
    <h2 className="text-2xl sm:text-[1.75rem] mb-5">{title}</h2>
    <div className="prose-editorial">
      {children}
    </div>
  </section>
);

export default ProjectSection;
