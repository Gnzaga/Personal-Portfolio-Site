import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Detail-page section: a flat bordered panel with a mono uppercase header.
 *
 * @param {string} title - Section title (rendered uppercase in the header strip).
 * @param {object} icon - FontAwesome icon shown in the header.
 * @param {React.ReactNode} children - Section body.
 * @returns {JSX.Element}
 */
const ProjectSection = ({ title, icon, children }) => (
  <section className="panel">
    <h2 className="panel-header justify-start">
      {icon && <FontAwesomeIcon icon={icon} className="w-3 text-signal" aria-hidden="true" />}
      {title}
    </h2>
    <div className="p-4 font-sans text-[15px] leading-relaxed text-fg/85 md:p-5">
      {children}
    </div>
  </section>
);

export default ProjectSection;
