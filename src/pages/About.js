import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Users, Award, Briefcase, Zap, Server, Shield } from 'lucide-react';
import StaggeredList from '../components/StaggeredList';
import SkillsComponent from '../components/SkillsComponent';
import GlassCard from '../components/GlassCard';

const About = () => {
  return (
    <div className="w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">Me</span>
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Platform Engineer building scalable infrastructure and security systems
          </motion.p>
        </div>

      <StaggeredList>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Profile Card (2x1) */}
          <div className="md:col-span-2">
            <GlassCard className="h-full flex flex-col md:flex-row items-center gap-8 p-8 bg-gradient-to-br from-white/10 to-white/5">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-6 h-6 text-green-500" />
                    <h2 className="text-2xl font-bold text-white">Passionate Technologist</h2>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    I am <span className="text-green-500 font-semibold">Alessandro Gonzaga</span>, a Platform Engineer at Verizon specializing in Anti-Spam Systems.
                    I operate and extend platforms protecting 100M+ messaging endpoints, building microservices in Go,
                    designing data lake architectures, and driving automation with Terraform and agentic AI workflows.
                  </p>
                </div>
                <div className="w-40 h-40 flex-shrink-0 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(21,128,61,0.3)] border-4 border-green-800/30 overflow-hidden">
                    <img src="/images/alex.jpg" alt="Alessandro Gonzaga" className="w-full h-full object-cover object-[75%_20%]" />
                </div>
            </GlassCard>
          </div>

          {/* Stats / Leadership (1x1) */}
          <div className="md:col-span-1">
             <GlassCard className="h-full flex flex-col justify-center bg-gradient-to-br from-green-900/40 to-black/40">
                <div className="text-center space-y-6">
                    <div>
                        <div className="text-4xl font-bold text-white mb-1">200+</div>
                        <div className="text-green-300 text-sm font-medium uppercase tracking-wider">Team Members Led</div>
                    </div>
                    <div className="w-16 h-1 bg-white/10 mx-auto rounded-full"></div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-1">100M+</div>
                        <div className="text-emerald-300 text-sm font-medium uppercase tracking-wider">Endpoints Secured</div>
                    </div>
                </div>
             </GlassCard>
          </div>
        </div>

        {/* Current Role Section - Wide Card */}
        <GlassCard className="mb-8 border-l-4 border-l-green-700" data-agent-target="current-role">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <Briefcase className="w-6 h-6 text-green-500" />
                 <h3 className="text-2xl font-bold text-white">Current Role at Verizon</h3>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                At Verizon, I operate and extend the platform protecting 100M+ messaging endpoints from spam.
                My work includes replacing legacy workflows with Terraform-based orchestration, building Go
                microservices for URL intelligence, and designing data lake architectures.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Anti-Spam Platform Engineering", icon: Shield },
                { label: "Infrastructure Automation (Terraform, Go)", icon: Server },
                { label: "Data & Intelligence Pipelines", icon: Zap },
                { label: "Cross-org Technical Leadership", icon: Users }
              ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                    <item.icon className="w-5 h-5 text-green-500" />
                    <span className="text-white/90 font-medium">{item.label}</span>
                  </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Skills Component - Updated Container */}
        <div data-agent-target="skills-section" className="mb-8">
          <SkillsComponent />
        </div>

        {/* Technical Expertise - Grid of Glass Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            <GlassCard className="bg-gradient-to-br from-black/40 to-transparent">
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <Zap className="w-5 h-5 text-yellow-300" /> Core Specializations
               </h3>
               <ul className="space-y-4">
                {[
                    "Anti-Spam & Security Platforms",
                    "Infrastructure Automation (Terraform, Ansible)",
                    "Data Pipelines (BigQuery, NiFi, Redis)",
                    "Kubernetes & Container Orchestration"
                ].map((skill, i) => (
                    <li key={i} className="flex items-center space-x-3 group">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full group-hover:shadow-[0_0_8px_rgba(21,128,61,0.8)] transition-shadow"></span>
                        <span className="text-white/80 group-hover:text-white transition-colors">{skill}</span>
                    </li>
                ))}
               </ul>
            </GlassCard>

            <GlassCard className="bg-gradient-to-bl from-black/40 to-transparent">
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <Code className="w-5 h-5 text-emerald-500" /> Development Skills
               </h3>
               <div className="flex flex-wrap gap-2">
                {['Python', 'Go', 'Terraform', 'Bash', 'SQL', 'JavaScript', 'Docker', 'Kubernetes'].map((skill) => (
                  <span key={skill} className="bg-white/10 hover:bg-white/20 text-white/90 px-4 py-2 rounded-lg text-sm font-medium border border-white/10 transition-all hover:scale-105 cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
        </div>

      </StaggeredList>
    </div>
  );
};

export default About;