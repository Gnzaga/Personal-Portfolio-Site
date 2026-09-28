// src/pages/Blog.js

import React from 'react';
import { Link } from 'react-router-dom';
import { sortedBlogData } from '../data/blogData';

// Post dates are free-form ("May 12, 2026" or "May 2026"); show the month
// (and day when present) since the year is the group heading.
const shortDate = (raw) => {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  const hasDay = /\d{1,2},/.test(raw);
  return d.toLocaleDateString('en-US', hasDay ? { month: 'short', day: 'numeric' } : { month: 'short' });
};

const groupByYear = (posts) =>
  posts.reduce((groups, post) => {
    const year = new Date(post.date).getFullYear() || 'Undated';
    const group = groups.find((g) => g.year === year);
    if (group) group.posts.push(post);
    else groups.push({ year, posts: [post] });
    return groups;
  }, []);

const Blog = () => {
  const posts = sortedBlogData.filter((post) => post && typeof post === 'object' && post.slug);
  const groups = groupByYear(posts);

  return (
    <div className="w-full">
      <header className="max-w-measure">
        <h1 className="text-4xl sm:text-5xl">Writing</h1>
        <p className="mt-4 text-xl text-muted leading-snug">
          Thoughts on engineering, infrastructure, and technology.
        </p>
      </header>

      {posts.length === 0 && <p className="mt-12 text-muted">No posts yet.</p>}

      {groups.map(({ year, posts: yearPosts }) => (
        <section key={year} className="mt-14 grid md:grid-cols-[6rem_1fr] gap-x-8">
          <h2 className="font-display text-3xl text-muted md:pt-5 border-b border-rule md:border-0 pb-3 md:pb-0">{year}</h2>
          <ol>
            {yearPosts.map((post) => (
              <li
                key={post.slug}
                data-agent-target={`blog-${post.slug}`}
                className="grid grid-cols-[4.5rem_1fr] gap-x-4 py-5 border-b border-rule"
              >
                <span className="meta pt-1">{shortDate(post.date)}</span>
                <div>
                  <Link
                    to={`/blog/${post.slug}`}
                    data-agent-target={`blog-${post.slug}-link`}
                    className="font-display text-xl leading-snug hover:text-accent"
                  >
                    {post.title || 'Untitled Post'}
                  </Link>
                  {post.summary && <p className="mt-1 text-muted max-w-measure">{post.summary}</p>}
                  {post.tags?.length > 0 && (
                    <p className="meta mt-2">{post.tags.map((t) => t.label).join(', ')}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
};

export default Blog;
