// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import TaskManagementProject from './pages/TaskManagementProject';
import DiscordBotProject from './pages/DiscordBotProject';
import ChatGnzagaProject from './pages/ChatGnzagaProject';
import NotFound from './pages/404';
import ErrorPage from './pages/Error';
import Footer from './components/Footer';
import Experience from './pages/experience';
import PlaylistGeneratorProject from './pages/PlaylistProject';
import PortfolioProject from './pages/PortfolioProject';

function App() {
  return (
    <Router>
        <div className="bg-slate-900 min-h-screen flex flex-col">

        <Navbar />
        <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/task-management" element={<TaskManagementProject />} />
          <Route path="/projects/PlaylistProject" element={<PlaylistGeneratorProject />} />
          <Route path="/projects/discord-bot" element={<DiscordBotProject />} />
          <Route path="/projects/chat-gnzaga" element={<ChatGnzagaProject />} />
          <Route path="/projects/portfolio-project" element={<PortfolioProject />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />


        </Routes>
      </div>
      <Footer />
      </div>
    </Router>
  );
}

export default App;