// src/App.js

import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout'; // Import the new Layout component
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

// Lazy load pages
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Experience = lazy(() => import('./pages/Experience'));
const NotFound = lazy(() => import('./pages/404'));
const ErrorPage = lazy(() => import('./pages/Error'));
const PortfolioGrid = lazy(() => import('./components/PortfolioGrid'));

// Project Detail Pages
const TaskManagementProject = lazy(() => import('./pages/projects/TaskManagementProject'));
const DiscordBotProject = lazy(() => import('./pages/projects/DiscordBotProject'));
const ChatGnzagaProject = lazy(() => import('./pages/projects/ChatGnzagaProject'));
const PlaylistGeneratorProject = lazy(() => import('./pages/projects/PlaylistProject'));
const PortfolioProject = lazy(() => import('./pages/projects/PortfolioProject'));
const HomelabProject = lazy(() => import('./pages/projects/Homelab'));
const KubernetesCluster = lazy(() => import('./pages/projects/KubernetesCluster'));
const K8sAutomationPipeline = lazy(() => import('./pages/projects/K8sAutomationPipeline'));
const UnifiedIAMProject = lazy(() => import('./pages/projects/UnifiedIAMProject'));

const PathfindingDemo = lazy(() => import('./pages/PathfindingDemo'));
const Chatbot = lazy(() => import('./components/ChatBot'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin" />
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <PageTransition>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<PortfolioGrid />} />
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
                                                    <Route path="/projects/k8s-automation" element={<K8sAutomationPipeline />} />
                                                    <Route path="/projects/unified-iam" element={<UnifiedIAMProject />} />
                                                    <Route path="/experience" element={<Experience />} />                <Route path="/demo/pathfinding" element={<PathfindingDemo />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
          <Footer />
        </Layout>
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
