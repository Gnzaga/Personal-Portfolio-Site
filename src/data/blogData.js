// src/data/blogData.js


// 1) Grab all .js files from the blogPosts folder.
const importAll = (r) => r.keys().map(r);
const blogPosts = importAll(
  require.context('./blogPosts', false, /\.js$/)
  // Adjust the second argument if you have subfolders (true/false)
  // and the regex if you use a different extension or naming pattern.
);

// 2) blogPosts is now an array of modules. Each default export from
//    your blog post file is stored in the default property.
export const blogData = blogPosts.map((module) => module.default);


  export const sortedBlogData = blogData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  
// template:
// {
//     slug: "",
//     date: "",
//     title: "",

//     paragraphs: [
//         ``
//     ],
//     images: [
//         {
//             url: "",
//             alt: ""
//         }
//     ],
//     links: [
//         {
//             label: "",
//             url: ""
//         }
//     ]
// }
//];