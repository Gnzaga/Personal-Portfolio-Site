// src/pages/Blog.js
//
// Blog index as a dense table: date, title (+ one-line summary), tags.
// Rows keep the `blog-<slug>` / `blog-<slug>-link` agent targets.

import React from 'react';
import { Link } from 'react-router-dom';
import { sortedBlogData } from '../data/blogData';
import { toLogDate } from '../utils/dateUtils';

const Blog = () => {
  const posts = sortedBlogData.filter((post) => post && typeof post === 'object' && post.slug);

  return (
    <div className="w-full">
      <header className="mb-6">
        <p className="label">~/blog</p>
        <h1 className="page-title mt-1">Blog</h1>
        <p className="page-lede">
          Thoughts on engineering, infrastructure, and technology — {posts.length} posts, newest first.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="panel p-6 font-mono text-xs text-mute">No blog posts available at the moment.</p>
      ) : (
        <div className="panel">
          <table className="block w-full border-collapse md:table">
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-line">
                <th scope="col" className="label w-32 px-3 py-2 text-left">date</th>
                <th scope="col" className="label px-3 py-2 text-left">title</th>
                <th scope="col" className="label w-64 px-3 py-2 text-left">tags</th>
              </tr>
            </thead>
            <tbody className="block divide-y divide-line md:table-row-group">
              {posts.map((post) => {
                const { title, date, summary, tags = [] } = post;
                return (
                  <tr
                    key={post.slug}
                    data-agent-target={`blog-${post.slug}`}
                    className="group block px-3 py-3 md:table-row md:p-0 md:hover:bg-raised"
                  >
                    <td className="block font-mono text-xs text-mute md:table-cell md:whitespace-nowrap md:px-3 md:py-2.5 md:align-top">
                      <time dateTime={toLogDate(date)} title={date}>{toLogDate(date) || 'No date'}</time>
                    </td>
                    <td className="mt-1 block md:mt-0 md:table-cell md:px-3 md:py-2.5 md:align-top">
                      <Link
                        to={`/blog/${post.slug}`}
                        data-agent-target={`blog-${post.slug}-link`}
                        className="font-mono text-[13px] font-medium text-fg hover:text-signal md:text-sm"
                      >
                        {title || 'Untitled Post'}
                      </Link>
                      {summary && (
                        <p className="mt-1 line-clamp-2 max-w-3xl font-sans text-[13px] leading-snug text-mute md:line-clamp-1">
                          {summary}
                        </p>
                      )}
                    </td>
                    <td className="mt-2 block md:mt-0 md:table-cell md:px-3 md:py-2.5 md:align-top">
                      <div className="flex flex-wrap gap-1">
                        {tags.map((tag) => (
                          <span key={tag.label} className="tag">{tag.label}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Blog;
