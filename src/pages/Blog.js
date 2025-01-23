// src/pages/BlogList.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogData, sortedBlogData } from "../data/blogData";

const BlogList = () => {
    const [expandedSlug, setExpandedSlug] = useState(null);

    const toggleExpand = (slug) => {
        if (expandedSlug === slug) {
            setExpandedSlug(null);
        } else {
            setExpandedSlug(slug);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-24">
            <div className="container mx-auto px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-bold text-white mb-12 text-center"
                >
                    My Blog
                </motion.h1>

                {sortedBlogData.map((post) => {
                    const isExpanded = expandedSlug === post.slug;
                    return (
                        <motion.div
                            key={post.slug}
                            className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8 border border-gray-700"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {post.title}
                            </h2>
                            <p className="text-gray-400 text-sm mb-4">{post.date}</p>
                            <p className="text-gray-300 mb-4">
                                {post.summary}...
                            </p>

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

                            <div className="flex space-x-4 items-center">
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="text-blue-400 hover:text-blue-300 font-semibold"
                                >
                                    Read on separate page
                                </Link>
                                <div className="h-6 border-l border-gray-600"></div>
                                <button
                                    onClick={() => toggleExpand(post.slug)}
                                    className="text-blue-400 hover:text-blue-300 font-semibold"
                                >
                                    {isExpanded ? "Collapse" : "Expand here"}
                                </button>
                            </div>

                            {isExpanded && (
                                <motion.div
                                    className="mt-6"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
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
                                                    {post.links.map((link, idx) => (
                                                        <React.Fragment key={idx}>
                                                            <a
                                                                href={link.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="bg-gray-200 text-black text-xs  hover:bg-gray-500  px-2 py-1 rounded"
                                                            >
                                                                {link.label}
                                                            </a>
                                                            {idx < post.links.length - 1 && (
                                                                <span className="text-gray-400 text-xs mx-2">|</span>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            )}
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default BlogList;
