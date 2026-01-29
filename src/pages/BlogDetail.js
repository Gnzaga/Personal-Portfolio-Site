// src/pages/BlogDetail.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogData, sortedBlogData } from "../data/blogData";

const BlogDetail = () => {
  const { slug } = useParams();
  // Find the blog post by slug
  const post = sortedBlogData.find((p) => p.slug === slug);

  // If no post found, show a 404 message
  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-950 py-24 transition-colors duration-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h1
              className="page-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Post <span className="gradient-text">Not Found</span>
            </motion.h1>
            <motion.p
              className="page-subheader mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The blog post you're looking for doesn't exist.
            </motion.p>
            <div className="section-divider"></div>
          </div>
          <div className="text-center">
            <Link to="/blog" className="btn-primary inline-flex items-center space-x-2">
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 py-24 transition-colors duration-200">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="page-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post.title}
          </motion.h1>
          <motion.p
            className="page-subheader mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {post.date}
          </motion.p>
          <div className="section-divider"></div>
        </div>

        {/* Article Card */}
        <motion.div
          className="card p-8 md:p-12 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, idx) => (
                <a
                  key={idx}
                  href={tag.url}
                  className="bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-primary-300 text-xs px-3 py-1 rounded-full font-medium border border-gray-300 dark:border-dark-600 hover:border-primary-500 transition-colors duration-300"
                >
                  {tag.label}
                </a>
              ))}
            </div>
          )}

          {post.paragraphs.map((para, idx) => (
            <p key={idx} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-300">
              {para}
            </p>
          ))}

          {/* Images */}
          {post.images.length > 0 && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6 mt-8">
              {post.images.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg shadow-lg border border-gray-300 dark:border-dark-700 hover:border-primary-500 transition-colors duration-300">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          {post.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {post.links.map((link, idx) => {
                const isInternal = link.url.includes("gnzaga.com");
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target={isInternal ? "_self" : "_blank"}
                    rel={isInternal ? "" : "noopener noreferrer"}
                    className="bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-primary-300 text-xs px-3 py-1 rounded-full font-medium border border-gray-300 dark:border-dark-600 hover:border-primary-500 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Back to Blog */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/blog" className="btn-outline inline-flex items-center space-x-2">
            <span>← Back to Blog</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
