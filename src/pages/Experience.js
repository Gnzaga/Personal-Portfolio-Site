// src/pages/Experience.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import StaggeredList from '../components/StaggeredList';
import AnimatedLine from '../components/AnimatedLine';
import GlassCard from '../components/GlassCard';
import { calculateDuration } from '../utils/dateUtils';

/**
 * ExperienceCard Component
 */
const ExperienceCard = ({ title, company, duration, location, type, details }) => (
  <GlassCard className="mb-6 group">
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white group-hover:text-green-500 transition-colors duration-200">{title}</h2>
        <div className="flex items-center text-white/80 font-medium text-lg mt-1">
          <span>{company}</span>
          <span className="mx-2 text-white/40">•</span>
          <span className="text-white/60 text-sm bg-white/10 px-3 py-0.5 rounded-full">{type}</span>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end gap-1 text-sm text-white/70">
        <div className="flex items-center bg-black/20 px-3 py-1 rounded-lg">
          <Calendar className="w-4 h-4 mr-2 text-green-500" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center px-3">
          <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
          <span>{location}</span>
        </div>
      </div>
    </div>
    
    <div className="h-px w-full bg-white/10 mb-4" />

    <ul className="space-y-3 text-white/90 text-base leading-relaxed">
      {details.map((detail, index) => (
        <li key={index} className="flex items-start">
          <span className="inline-block h-2 w-2 bg-green-700 rounded-full mt-2 mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(21,128,61,0.5)]"></span>
          <span>{detail}</span>
        </li>
      ))}
    </ul>
  </GlassCard>
);

/**
 * Experience Component
 */
const Experience = () => {
  const [currentDuration, setCurrentDuration] = useState('');
  const [networkEngineerDuration, setNetworkEngineerDuration] = useState('');

  useEffect(() => {
    setCurrentDuration(calculateDuration('2025-09-01'));
    setNetworkEngineerDuration(calculateDuration('2024-06-01', '2025-09-01'));
  }, []);

  return (
    <div className="w-full">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">Journey</span>
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Building scalable infrastructure and leading technical teams
          </motion.p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Animated Line tailored for the glass theme */}
          <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-800/50 via-white/20 to-transparent hidden md:block"></div>
          
          <StaggeredList>
            {/* Platform Engineer, Anti-Spam Systems */}
            <div className="pl-0 md:pl-12 relative">
               <div className="absolute left-[16px] top-8 w-3 h-3 bg-green-700 rounded-full shadow-[0_0_15px_rgba(21,128,61,0.8)] hidden md:block z-10"></div>
               <div data-agent-target="experience-1">
                <ExperienceCard
                  title="Platform Engineer, Anti-Spam Systems"
                  company="Verizon"
                  type="Full-time"
                  duration={`Sep 2025 - Present · ${currentDuration}`}
                  location="Bedminster, NJ · Hybrid"
                  details={[
                    "Operate and extend platform protecting 100M+ messaging endpoints from spam across Verizon's internal and inter-carrier networks.",
                    "Replaced legacy OpenStack+Heat workflows with Terraform-based VM orchestration, reducing deployment time from 3-4 hours (6 VMs) to 5 minutes (62 VMs across 4 tenant spaces in multiple states).",
                    "Built URL intelligence microservice in Go processing 3,100+ IP/s for ASN lookups; implemented warm caching layer that increased DNS throughput from 120/s to 75,000+/s for repeated domains.",
                    "Developed agentic workflow that navigates our environment to detect spam patterns and generate threat intelligence reports, reducing manual investigation time.",
                    "Designed data lake architecture for spam intelligence pipeline (BigQuery, Apache NiFi, Redis) with retention policies—currently driving cross-org alignment for implementation."
                  ]}
                />
               </div>
            </div>

            {/* Network Engineer Experience */}
            <div className="pl-0 md:pl-12 relative">
              <div className="absolute left-[16px] top-8 w-3 h-3 bg-green-800/50 rounded-full hidden md:block z-10"></div>
              <div data-agent-target="experience-2">
                <ExperienceCard
                  title="Network Engineer, Edge & Core Implementation"
                  company="Verizon"
                  type="Full-time"
                  duration={`Jun 2024 - Sep 2025 · ${networkEngineerDuration}`}
                  location="Bedminster, NJ · Hybrid"
                  details={[
                    "Led automation efforts across Verizon's nationwide Edge sites, developing agentic AI tools to assist engineers in managing projects and troubleshooting edge infrastructure.",
                    "Built automation pipeline for site audits, decreasing preparation time by 90% and enabling $100,000+ annual power savings after pilot program.",
                    "Automated end-to-end FOA network testing for AWS MEC deployments using Terraform, Ansible, and Python—reduced test suite deployment from 3 hours to seconds per site."
                  ]}
                />
              </div>
            </div>

            {/* Rutgers University - Office of Information Technology */}
            <div className="pl-0 md:pl-12 relative">
              <div className="absolute left-[16px] top-8 w-3 h-3 bg-green-800/50 rounded-full hidden md:block z-10"></div>
              <div data-agent-target="experience-3">
                <ExperienceCard
                  title="Level 3 Supervisor, Office of Information Technology"
                  company="Rutgers University"
                  type="Part-time"
                  duration="May 2022 - Jun 2024"
                  location="Piscataway, NJ"
                  details={[
                    "Supervised and trained 200+ consultants while managing high-priority technical escalations; achieved top ticket resolution rate with 20% reduction in average response time."
                  ]}
                />
              </div>
            </div>
          </StaggeredList>
        </div>
    </div>
  );
};

export default Experience;