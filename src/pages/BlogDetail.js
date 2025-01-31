// src/pages/BlogDetail.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogData, sortedBlogData } from "../data/blogData";

const BlogDetail = () => {
  const { slug } = useParams();
  // Find the blog post by slug
  const post = sortedBlogData.find((p) => p.slug === slug);

  // If no post found, you might want to show a 404 or redirect
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">
            Post not found :(
          </h1>
          <Link to="/blog" className="text-blue-400 hover:underline">
            Return to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8 border border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>
          <p className="text-gray-400 text-sm mb-4">{post.date}</p>

          {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag, idx) => (
                                        <a
                                            key={idx}
                                            href={tag.url}
                                            className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                                        >
                                            {tag.label}
                                        </a>
                                    ))}
                                </div>
                            )}
          
          {post.paragraphs.map((para, idx) => (
            <p key={idx} className="text-gray-300 mb-4">
              {para}
            </p>
          ))}

        {/* Images */}
            {post.images.length > 0 && (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-4">
                {post.images.map((img, idx) => (
                    <img
                    key={idx}
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-auto rounded-lg shadow"
                    />
                ))}
                </div>
            )}

            {/* Links */}
            {post.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2">
                {post.links.map((link, idx) => {
                    const isInternal = link.url.includes("gnzaga.com");
                    return (
                    <React.Fragment key={idx}>
                        <a
                        href={link.url}
                        target={isInternal ? "_self" : "_blank"}
                        rel={isInternal ? "" : "noopener noreferrer"}
                        className="bg-gray-200 text-black text-xs  hover:bg-gray-500  px-2 py-1 rounded"
                        >
                        {link.label}
                        </a>
                    
                    </React.Fragment>
                    );
                })}
                </div>
            )}
            </motion.div>

            {/* Link back to blog */}
        <Link to="/blog" className="text-blue-400 hover:text-blue-300">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
