// src/pages/BlogDetail.js
//
// A single post inside the console frame: mono metadata header, prose in
// Inter at a ~68ch measure, then references and older/newer navigation.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sortedBlogData } from '../data/blogData';
import { toLogDate } from '../utils/dateUtils';

const BlogDetail = () => {
  const { slug } = useParams();
  const index = sortedBlogData.findIndex((p) => p.slug === slug);
  const post = sortedBlogData[index];

  if (!post) {
    return (
      <div className="panel mx-auto mt-8 max-w-2xl">
        <div className="panel-header">
          <span>exit 404</span>
          <span className="text-warn">not found</span>
        </div>
        <div className="p-5 font-mono text-sm">
          <h1 className="text-fg">Post Not Found</h1>
          <p className="mt-1 text-mute">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn mt-6">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const newer = index > 0 ? sortedBlogData[index - 1] : null;
  const older = index < sortedBlogData.length - 1 ? sortedBlogData[index + 1] : null;
  const { tags = [], paragraphs = [], images = [], links = [] } = post;

  return (
    <article className="mx-auto w-full max-w-4xl">
      <header className="panel">
        <div className="panel-header">
          <span className="min-w-0 truncate normal-case tracking-normal">
            <Link to="/blog" className="hover:text-fg">~/blog</Link>
            <span className="text-line-strong">/</span>
            <span className="text-signal">{post.slug}</span>
          </span>
          <span className="shrink-0 normal-case tracking-normal">
            {paragraphs.length} ¶
          </span>
        </div>
        <div className="p-4 md:p-6">
          <h1 className="font-mono text-2xl font-semibold leading-tight text-fg md:text-3xl">{post.title}</h1>
          <dl className="mt-4 grid grid-cols-[4rem_1fr] gap-y-1.5 font-mono text-xs">
            <dt className="text-mute">date</dt>
            <dd className="text-fg"><time dateTime={toLogDate(post.date)}>{post.date}</time></dd>
            {tags.length > 0 && (
              <>
                <dt className="text-mute">tags</dt>
                <dd className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <a key={tag.label} href={tag.url} className="tag hover:border-signal hover:text-signal">
                      {tag.label}
                    </a>
                  ))}
                </dd>
              </>
            )}
          </dl>
        </div>
      </header>

      <div className="panel mt-4 px-4 py-6 md:px-10 md:py-10">
        <div className="prose-console mx-auto">
          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {images.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-[68ch] grid-cols-1 gap-4 sm:grid-cols-2">
            {images.map((img, idx) => (
              <figure key={idx} className="border border-line bg-ink">
                <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
              </figure>
            ))}
          </div>
        )}

        {links.length > 0 && (
          <div className="mx-auto mt-10 max-w-[68ch] border-t border-line pt-6">
            <h2 className="label mb-3">References</h2>
            <ul className="space-y-1.5 font-mono text-[13px]">
              {links.map((link, idx) => {
                const isInternal = link.url.includes('gnzaga.com') || link.url.startsWith('/');
                return (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target={isInternal ? '_self' : '_blank'}
                      rel={isInternal ? undefined : 'noopener noreferrer'}
                      className="text-signal underline decoration-signal/40 underline-offset-4 hover:text-fg"
                    >
                      {link.label}
                    </a>
                    {!isInternal && <span className="text-mute"> ↗</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <nav aria-label="More posts" className="mt-4 grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2">
        {older ? (
          <Link to={`/blog/${older.slug}`} className="panel block p-3 hover:border-signal">
            <span className="text-mute">← older · {toLogDate(older.date)}</span>
            <span className="mt-1 block truncate text-fg">{older.title}</span>
          </Link>
        ) : <span />}
        {newer ? (
          <Link to={`/blog/${newer.slug}`} className="panel block p-3 text-right hover:border-signal">
            <span className="text-mute">newer · {toLogDate(newer.date)} →</span>
            <span className="mt-1 block truncate text-fg">{newer.title}</span>
          </Link>
        ) : <span />}
      </nav>

      <div className="mt-4">
        <Link to="/blog" className="btn">← Back to Blog</Link>
      </div>
    </article>
  );
};

export default BlogDetail;
