// src/pages/Blog.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogData, sortedBlogData } from "../data/blogData";
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { Calendar, ArrowRight, Tag, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

const Blog = () => {
    const [expandedSlug, setExpandedSlug] = useState(null);

    const toggleExpand = (slug) => {
        setExpandedSlug(expandedSlug === slug ? null : slug);
    };

    const validBlogPosts = sortedBlogData.filter(post => post && typeof post === 'object' && post.slug);

    if (validBlogPosts.length === 0) {
        return (
            <div className="w-full">
                <div className="text-center mb-12">
                    <motion.h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">Blog</span>
                    </motion.h1>
                    <p className="text-xl text-white/80">No blog posts available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="text-center mb-12">
                <motion.h1
                    className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">Blog</span>
                </motion.h1>
                <motion.p
                    className="text-xl text-white/80 max-w-2xl mx-auto drop-shadow-md"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Thoughts on engineering, infrastructure, and technology
                </motion.p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {validBlogPosts.map((post) => {
                    const isExpanded = expandedSlug === post.slug;
                    const { title, date, summary, tags = [], paragraphs = [], images = [], links = [] } = post;
                    
                    return (
                        <GlassCard
                            key={post.slug}
                            data-agent-target={`blog-${post.slug}`}
                            className="p-8 group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-green-500 transition-colors duration-300">
                                    {title || 'Untitled Post'}
                                </h2>
                                <div className="flex items-center text-white/60 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/5 whitespace-nowrap">
                                    <Calendar className="w-4 h-4 mr-2 text-green-600" />
                                    {date || 'No date'}
                                </div>
                            </div>
                            
                            <p className="text-white/80 mb-6 leading-relaxed text-lg">
                                {summary || 'No summary available'}...
                            </p>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {tags.map((tag, idx) => (
                                        <div key={idx} className="flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white/80">
                                            <Tag className="w-3 h-3 mr-1 text-green-600" />
                                            {tag.label}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <Link to={`/blog/${post.slug}`} className="flex-1" data-agent-target={`blog-${post.slug}-link`}>
                                    <GlassButton variant="primary" className="w-full bg-green-800/20 hover:bg-green-700/40 border-green-700/20 shadow-green-950/20">
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        Read Full Article
                                    </GlassButton>
                                </Link>
                                <div className="flex-1">
                                    <GlassButton 
                                        onClick={() => toggleExpand(post.slug)} 
                                        variant="outline" 
                                        className="w-full justify-center"
                                    >
                                        {isExpanded ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                                        {isExpanded ? "Collapse" : "Quick View"}
                                    </GlassButton>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        className="mt-8 pt-6 border-t border-white/10"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        {paragraphs.map((para, idx) => (
                                            <p key={idx} className="text-white/80 mb-5 leading-relaxed">
                                                {para}
                                            </p>
                                        ))}
                                    
                                        {/* Images */}
                                        {images.length > 0 && (
                                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6 mt-8">
                                                {images.map((img, idx) => (
                                                    <div key={idx} className="overflow-hidden rounded-lg shadow-lg border border-white/20">
                                                        <img
                                                            src={img.url}
                                                            alt={img.alt || 'Blog image'}
                                                            className="w-full h-auto transform hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {/* Links */}
                                        {links.length > 0 && (
                                            <div className="flex flex-wrap gap-3 mt-6">
                                                {links.map((link, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={link.url}
                                                        target={link.url.startsWith("/") ? "_self" : "_blank"}
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-green-500 hover:text-white transition-colors text-sm font-medium underline-offset-4 hover:underline"
                                                    >
                                                        {link.label} <ArrowRight className="w-3 h-3" />
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
};

export default Blog;
