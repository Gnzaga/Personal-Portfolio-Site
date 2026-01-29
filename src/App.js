// src/App.js

// Import core React functionality
import React, { useEffect, Suspense, lazy } from 'react';

// Import React Router for handling routing within the app
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import ThemeProvider for light/dark mode functionality
import { ThemeProvider } from './context/ThemeContext';

// Import components that are needed immediately
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

// Lazy load pages for better performance (code splitting)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Experience = lazy(() => import('./pages/Experience'));
const NotFound = lazy(() => import('./pages/404'));
const ErrorPage = lazy(() => import('./pages/Error'));

// Lazy load project detail pages
const TaskManagementProject = lazy(() => import('./pages/projects/TaskManagementProject'));
const DiscordBotProject = lazy(() => import('./pages/projects/DiscordBotProject'));
const ChatGnzagaProject = lazy(() => import('./pages/projects/ChatGnzagaProject'));
const PlaylistGeneratorProject = lazy(() => import('./pages/projects/PlaylistProject'));
const PortfolioProject = lazy(() => import('./pages/projects/PortfolioProject'));
const HomelabProject = lazy(() => import('./pages/projects/Homelab'));
const KubernetesCluster = lazy(() => import('./pages/projects/KubernetesCluster'));

// Lazy load secret demo page
const PathfindingDemo = lazy(() => import('./pages/PathfindingDemo'));

// Lazy load chatbot (not needed on initial render)
const Chatbot = lazy(() => import('./components/ChatBot'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
  </div>
);
/**
 * Component to scroll the window to the top when navigating between routes.
 */
function ScrollToTop() {
  const { pathname } = useLocation(); // Get the current path location from React Router
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on path change
  }, [pathname]); // Dependency array to re-run the effect on path change
  return null; // This component does not render any UI
}

/**
 * Main App component that sets up the routing, layout, and structure of the app.
 * Contains a navbar, page transition wrapper, dynamic routes, and a footer.
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="bg-white dark:bg-gradient-dark min-h-screen flex flex-col custom-scrollbar transition-colors duration-300">
          <Navbar />
          <PageTransition>
            <main className="flex-grow pt-10">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/projects/task-management" element={<TaskManagementProject />} />
                  <Route path="/projects/playlist-generator" element={<PlaylistGeneratorProject />} />
                  <Route path="/projects/PlaylistProject" element={<PlaylistGeneratorProject />} />
                  <Route path="/projects/discord-bot" element={<DiscordBotProject />} />
                  <Route path="/projects/chat-gnzaga" element={<ChatGnzagaProject />} />
                  <Route path="/projects/portfolio-project" element={<PortfolioProject />} />
                  <Route path="/projects/kubernetes-cluster" element={<KubernetesCluster />} />
                  <Route path="/projects/homelab" element={<HomelabProject />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/demo/pathfinding" element={<PathfindingDemo />} />
                  <Route path="/error" element={<ErrorPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </PageTransition>
          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
}

// Export the App component as the default export of this module
export default App;
