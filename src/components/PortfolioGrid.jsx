import React from 'react';
import { Terminal, Cpu, Download, Linkedin, Mail, MapPin, Code, Database, Globe, Cloud, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import AnimatedHero from './AnimatedHero';
import Alessandro_Gonzaga_Resume from '../res/Alessandro_Gonzaga_Resume.pdf';

const PortfolioGrid = () => {
  return (
    <div className="min-h-screen p-6 lg:pt-0 lg:px-12 lg:pb-12 max-w-7xl mx-auto flex flex-col justify-center">
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. Hero Card (Spans 2 columns) */}
        <GlassCard className="lg:col-span-2 min-h-[450px] relative group flex flex-col justify-end p-10 overflow-hidden bg-black/40 border-white/10">
          <AnimatedHero className="opacity-60 group-hover:opacity-80 transition-opacity duration-1000" />
          
          <div className="relative z-20 max-w-2xl pointer-events-none">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
              </span>
              <span className="text-green-500 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">System Status: Online</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              Platform <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-300">Engineering</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light">
              Reliability, Scale, &amp; Intelligent Automation
            </p>
          </div>
        </GlassCard>

        {/* 2. Identity & Connect Card (Spans 1 column) */}
        <GlassCard className="lg:col-span-1 flex flex-col p-0 overflow-hidden bg-white/5">
          {/* Profile Image Section */}
          <div className="relative h-80 w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
            <img 
              src="/images/alex.jpg" 
              alt="Alessandro Gonzaga" 
              className="w-full h-full object-cover object-[center_25%] lg:object-[75%_20%]"
            />
          </div>
          
          {/* Content */}
          <div className="p-8 flex-grow flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Alessandro Gonzaga</h2>
              <p className="text-lg text-green-500 mb-4 font-medium">Builder / Engineer</p>
              <div className="flex items-center text-white/50 text-sm mb-6">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                <span>New York Metropolitan Area</span>
              </div>
            </div>

            <div className="space-y-4">
               {/* Socials */}
               <div className="flex gap-4">
                 <a href="https://www.linkedin.com/in/agnzaga/" target="_blank" rel="noopener noreferrer" className="flex-1 p-3 bg-white/5 rounded-xl hover:bg-blue-600/20 hover:border-blue-500/30 border border-white/5 transition-all flex items-center justify-center group">
                   <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                 </a>
                 <a href="mailto:hello@gnzaga.com" className="flex-1 p-3 bg-white/5 rounded-xl hover:bg-green-600/20 hover:border-green-500/30 border border-white/5 transition-all flex items-center justify-center group">
                   <Mail className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                 </a>
               </div>
               
               {/* Resume Button */}
               <a 
                href={Alessandro_Gonzaga_Resume}
                download="Alessandro_Gonzaga_Resume.pdf"
                className="flex items-center justify-center gap-3 w-full py-4 bg-green-800/30 hover:bg-green-700/40 rounded-xl text-white font-medium transition-all border border-green-700/30 hover:border-green-600/40 group shadow-lg hover:shadow-green-950/20"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </GlassCard>

        {/* 3. Tech Stack - Expanded (Spans 3 columns) */}
        <Link to="/projects" className="lg:col-span-3">
          <GlassCard className="p-10 flex flex-col justify-between group bg-white/5 hover:bg-white/10 transition-colors h-full">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-green-700/30 transition-colors">
                  <Terminal className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Technical Arsenal</h3>
                  <p className="text-white/50 text-sm">Full-Stack &amp; Infrastructure</p>
                </div>
              </div>
              <Cpu className="w-6 h-6 text-white/10 group-hover:text-white/30 transition-colors" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { label: 'Kubernetes', icon: Cloud },
                { label: 'Go', icon: Code },
                { label: 'Terraform', icon: Database },
                { label: 'AWS', icon: Cloud },
                { label: 'React', icon: Code },
                { label: 'Python', icon: Code },
                { label: 'Docker', icon: Terminal },
                { label: 'Linux', icon: Terminal },
                { label: 'Ansible', icon: Terminal },
                { label: 'Networking', icon: Globe },
                { label: 'Security', icon: Shield },
                { label: 'CI/CD', icon: Cpu }
              ].map((tech, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-black/20 rounded-xl border border-white/5 text-sm text-white/80 group-hover:border-green-700/30 group-hover:text-green-100 transition-colors">
                  <tech.icon className="w-4 h-4 text-green-500/70" />
                  <span>{tech.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </Link>

      </div>
    </div>
  );
};

export default PortfolioGrid;
