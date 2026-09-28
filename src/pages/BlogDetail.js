// src/pages/BlogDetail.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sortedBlogData } from '../data/blogData';

const BackLink = () => (
  <Link to="/blog" className="link">← All writing</Link>
);

const BlogDetail = () => {
  const { slug } = useParams();
  const post = sortedBlogData.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-measure py-12">
        <h1 className="text-4xl">Post not found</h1>
        <p className="mt-4 text-muted">The post you're looking for doesn't exist.</p>
        <p className="meta mt-8"><BackLink /></p>
      </div>
    );
  }

  const { title, date, tags = [], paragraphs = [], images = [], links = [] } = post;

  return (
    <article className="w-full max-w-measure mx-auto">
      <header className="mb-10">
        <p className="kicker mb-4">
          <Link to="/blog" className="hover:text-accent">Writing</Link>
          <span aria-hidden="true"> / </span>
          <time>{date}</time>
        </p>
        <h1 className="text-4xl sm:text-5xl leading-[1.1]">{title}</h1>
        {tags.length > 0 && (
          <p className="meta mt-6 pt-4 border-t border-rule flex flex-wrap gap-x-4 gap-y-1">
            {tags.map((tag) => (
              <a key={tag.label} href={tag.url} className="hover:text-accent">#{tag.label}</a>
            ))}
          </p>
        )}
      </header>

      <div className="prose-editorial text-[1.125rem] leading-[1.75]">
        {paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {images.length > 0 && (
        <div className="mt-10 space-y-8">
          {images.map((img) => (
            <figure key={img.url} className="figure">
              {/* Hide the whole figure if the asset is missing rather than show a broken image. */}
              <img
                src={img.url}
                alt={img.alt || ''}
                loading="lazy"
                onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
              />
              {img.alt && <figcaption>{img.alt}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <section className="mt-12 pt-6 border-t border-rule">
          <h2 className="kicker mb-3">References</h2>
          <ul className="space-y-1">
            {links.map((link, idx) => {
              const isInternal = link.url.startsWith('/') || link.url.includes('gnzaga.com');
              return (
                <li key={idx}>
                  <a
                    href={link.url}
                    target={isInternal ? '_self' : '_blank'}
                    rel={isInternal ? undefined : 'noopener noreferrer'}
                    className="link"
                  >
                    {link.label}{isInternal ? '' : ' ↗'}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <footer className="mt-14 pt-6 border-t border-rule meta">
        <BackLink />
      </footer>
    </article>
  );
};

export default BlogDetail;
