// src/App.js

// Import core React functionality
import React, { useEffect } from 'react';

// Import React Router for handling routing within the app
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import ThemeProvider for light/dark mode functionality
import { ThemeProvider } from './context/ThemeContext';

// Import components and pages for different parts of the app
import Navbar from './components/Navbar'; // Navigation bar component
import Home from './pages/Home'; // Home page component
import About from './pages/About'; // About page component
import Projects from './pages/Projects'; // Projects listing page component
import TaskManagementProject from './pages/projects/TaskManagementProject'; // Project detail page for task management project
import DiscordBotProject from './pages/projects/DiscordBotProject'; // Project detail page for Discord bot project
import ChatGnzagaProject from './pages/projects/ChatGnzagaProject'; // Project detail page for Chat Gnzaga project
import PlaylistGeneratorProject from './pages/projects/PlaylistProject'; // Project detail page for playlist generator project
import PortfolioProject from './pages/projects/PortfolioProject'; // Project detail page for the portfolio project
import HomelabProject from './pages/projects/Homelab'; // Project detail page for the homelab project
import KubernetesCluster from './pages/projects/KubernetesCluster'; // Project detail page for the Kubernetes cluster project
import Experience from './pages/Experience'; // Experience page component
import NotFound from './pages/404'; // 404 Not Found page component
import ErrorPage from './pages/Error'; // Error page component
import Footer from './components/Footer'; // Footer component
import PageTransition from './components/PageTransition'; // Component for page transition effects
import Chatbot from './components/ChatBot'; // Chatbot component for user interactions

import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/projects/task-management" element={<TaskManagementProject />} />
                <Route path="/projects/PlaylistProject" element={<PlaylistGeneratorProject />} />
                <Route path="/projects/discord-bot" element={<DiscordBotProject />} />
                <Route path="/projects/chat-gnzaga" element={<ChatGnzagaProject />} />
                <Route path="/projects/portfolio-project" element={<PortfolioProject />} />
                <Route path="/projects/kubernetes-cluster" element={<KubernetesCluster />} />
                <Route path="/projects/homelab" element={<HomelabProject />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </PageTransition>
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

// Export the App component as the default export of this module
export default App;
