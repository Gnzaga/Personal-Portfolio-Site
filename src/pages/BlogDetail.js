// src/pages/BlogDetail.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sortedBlogData } from "../data/blogData";
import GlassCard from "../components/GlassCard";
import GlassButton from "../components/GlassButton";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = sortedBlogData.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="w-full py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-white/60 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <GlassButton variant="primary">Back to Blog</GlassButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post.title}
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center gap-4 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <Calendar className="w-4 h-4 mr-2 text-green-600" />
              <span>{post.date}</span>
            </div>
          </motion.div>
        </div>

        {/* Article Content */}
        <GlassCard className="p-8 md:p-12 mb-12">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-6">
              {post.tags.map((tag, idx) => (
                <a
                  key={idx}
                  href={tag.url}
                  className="flex items-center bg-white/5 hover:bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full transition-colors border border-white/10"
                >
                  <Tag className="w-3 h-3 mr-1.5 text-green-600" />
                  {tag.label}
                </a>
              ))}
            </div>
          )}

          <div className="space-y-6 text-white/80 leading-relaxed text-lg">
            {post.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Images */}
          {post.images.length > 0 && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-12">
              {post.images.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-xl shadow-lg border border-white/10 bg-black/20">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          {post.links.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">References</h3>
              <div className="flex flex-wrap gap-3">
                {post.links.map((link, idx) => {
                  const isInternal = link.url.includes("gnzaga.com");
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target={isInternal ? "_self" : "_blank"}
                      rel={isInternal ? "" : "noopener noreferrer"}
                      className="text-green-500 hover:text-white underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </GlassCard>

        {/* Back Button */}
        <motion.div
          className="text-center pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/blog">
            <GlassButton variant="outline" className="inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </GlassButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
