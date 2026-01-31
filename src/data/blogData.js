// src/data/blogData.js

// 1) Grab all .js files from the blogPosts folder.
const importAll = (r) => r.keys().map(r);
const blogPosts = importAll(
  require.context('./blogPosts', false, /\.js$/)
);

// 2) blogPosts is now an array of modules. Each default export from
//    your blog post file is stored in the default property.
//    Filter out any undefined/null exports immediately.
export const blogData = blogPosts
  .map((module) => module.default)
  .filter(post => post && typeof post === 'object' && post.slug && post.date);

export const sortedBlogData = blogData.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB - dateA;
});
