// src/components/Figure.js

import React from 'react';

/**
 * Captioned editorial figure. `photo` is an entry from src/data/photos.js.
 */
const Figure = ({ photo, className = '', imgClassName = '' }) => (
  <figure className={`figure ${className}`}>
    <img
      src={photo.src}
      alt={photo.alt}
      loading="lazy"
      decoding="async"
      className={imgClassName}
    />
    <figcaption>{photo.caption}</figcaption>
  </figure>
);

export default Figure;
