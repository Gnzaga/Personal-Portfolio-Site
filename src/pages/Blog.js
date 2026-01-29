// src/pages/BlogList.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogData, sortedBlogData } from "../data/blogData";

const BlogList = () => {
    const [expandedSlug, setExpandedSlug] = useState(null);

    const toggleExpand = (slug) => {
        if (expandedSlug === slug) {
            setExpandedSlug(null);
        } else {
            setExpandedSlug(slug);
        }
        // Log for debugging
        console.log("Toggled slug:", slug);
    };

    // Filter out any undefined or invalid entries
    const validBlogPosts = sortedBlogData.filter(post => {
        if (!post || typeof post !== 'object') {
            console.warn('Invalid blog post entry found:', post);
            return false;
        }
        if (!post.slug) {
            console.warn('Blog post missing slug:', post);
            return false;
        }
        return true;
    });

    // If no valid posts, show a message
    if (validBlogPosts.length === 0) {
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
                            My <span className="gradient-text">Blog</span>
                        </motion.h1>
                        <motion.p
                            className="page-subheader mb-6"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            No blog posts available at the moment.
                        </motion.p>
                        <div className="section-divider"></div>
                    </div>
                </div>
            </div>
        );
    }

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
                        My <span className="gradient-text">Blog</span>
                    </motion.h1>
                    <motion.p
                        className="page-subheader mb-6"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Thoughts on engineering, infrastructure, and technology
                    </motion.p>
                    <div className="section-divider"></div>
                </div>

                {validBlogPosts.map((post) => {
                    const isExpanded = expandedSlug === post.slug;
                    
                    // Safely access post properties with defaults
                    const title = post.title || 'Untitled Post';
                    const date = post.date || 'No date';
                    const summary = post.summary || 'No summary available';
                    const tags = post.tags || [];
                    const paragraphs = post.paragraphs || [];
                    const images = post.images || [];
                    const links = post.links || [];
                    
                    return (
                        <motion.div
                            key={post.slug}
                            data-agent-target={`blog-${post.slug}`}
                            className="bg-gray-100 dark:bg-dark-800/80 backdrop-blur-sm border border-gray-200 dark:border-dark-600/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group p-8 mb-8 card-hover"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ y: -8 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                                    {title}
                                </h2>
                                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="text-primary-600 dark:text-primary-300 font-medium mb-2">{date}</p>
                            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                                {summary}...
                            </p>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {tags.map((tag, idx) => {
                                        // Validate tag structure
                                        if (!tag || !tag.url || !tag.label) {
                                            console.warn('Invalid tag structure:', tag);
                                            return null;
                                        }
                                        return (
                                            <a
                                                key={idx}
                                                href={tag.url}
                                                className="bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-primary-300 text-xs px-3 py-1 rounded-full font-medium border border-gray-300 dark:border-dark-600 hover:border-primary-500 transition-colors duration-300"
                                            >
                                                {tag.label}
                                            </a>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="flex gap-3 mt-auto">
                                <div className="flex-1">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="btn-outline flex items-center space-x-2 w-full justify-center text-sm"
                                            data-agent-target={`blog-${post.slug}-link`}
                                        >
                                            <span>Read Full Article</span>
                                        </Link>
                                    </motion.div>
                                </div>
                                <div className="flex-1">
                                    <motion.button
                                        onClick={() => toggleExpand(post.slug)}
                                        className="btn-primary flex items-center space-x-2 w-full justify-center text-sm"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span>{isExpanded ? "Collapse" : "Quick View"}</span>
                                    </motion.button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        className="mt-8 pt-6 border-t border-gray-300 dark:border-dark-700"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        key={post.slug}
                                    >
                                        {paragraphs.map((para, idx) => (
                                            <p key={idx} className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed transition-colors duration-300">
                                                {para}
                                            </p>
                                        ))}
                                    
                                    {/* Images */}
                                    {images.length > 0 && (
                                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6 mt-8">
                                            {images.map((img, idx) => {
                                                // Validate image structure
                                                if (!img || !img.url) {
                                                    console.warn('Invalid image structure:', img);
                                                    return null;
                                                }
                                                return (
                                                    <div key={idx} className="overflow-hidden rounded-lg shadow-lg border border-gray-300 dark:border-dark-700 hover:border-primary-500 transition-colors duration-300">
                                                        <img
                                                            src={img.url}
                                                            alt={img.alt || 'Blog image'}
                                                            className="w-full h-auto transform hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    
                                    {/* Links */}
                                    {links.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mt-6">
                                            {links.map((link, idx) => {
                                                // Validate link structure
                                                if (!link || !link.url || !link.label) {
                                                    console.warn('Invalid link structure:', link);
                                                    return null;
                                                }
                                                
                                                const isInternal = link.url.startsWith("/");
                                                return isInternal ? (
                                                    <Link
                                                        key={idx}
                                                        to={link.url}
                                                        className="bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-primary-300 text-xs px-3 py-1 rounded-full font-medium border border-gray-300 dark:border-dark-600 hover:border-primary-500 transition-colors duration-300"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ) : (                                                        <a
                                                        key={idx}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-primary-300 text-xs px-3 py-1 rounded-full font-medium border border-gray-300 dark:border-dark-600 hover:border-primary-500 transition-colors duration-300"
                                                    >
                                                        {link.label}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default BlogList;