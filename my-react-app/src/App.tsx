import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timeline } from './components/Timeline';
import { NeumorphicCard } from './components/NeumorphicCard';
import SkillChart from './components/SkillChart';
import GitHubStats from './components/GitHubStats';
import { useViewport } from './hooks/useViewport';
import './App.css';

interface Skill {
  name: string;
  level: number;
}

interface WorkExperience {
  year: string;
  title: string;
  company: string;
  companyLogo: string;
  startDate: string;
  endDate: string;
  description: string;
}

const workExperience: WorkExperience[] = [
  {
    year: "2024 - Present",
    title: "B2B Integration Specialist",
    company: "Verkkokauppa.com Oyj",
    companyLogo: "img/vklogo.avif",
    description: "Developing procurement system integrations using PEPPOL BIS Billing 3.0, cXML, and REST APIs.",
    startDate: "2024-11-01",
    endDate: new Date().toISOString().split('T')[0], // Current date
  },
  {
    year: "2022 - 2024",
    title: "Wholesales",
    company: "Verkkokauppa.com Oyj",
    companyLogo: "img/vklogo.avif",
    description: "",
    startDate: "2022-09-01",
    endDate: "2024-11-01",
  },
  {
    year: "2020 - 2024",
    title: "Export Sales",
    company: "Verkkokauppa.com Oyj",
    companyLogo: "img/vklogo.avif",
    description: "Tax-Free and Export services, such as sending products abroad and preparing export documents.",
    startDate: "2020-03-01",
    endDate: "2022-09-01",
  },
  {
    year: "2021 - 2021",
    title: "B2B Sales",
    company: "Verkkokauppa.com Oyj",
    companyLogo: "img/vklogo.avif",
    description: "Attention to Detail · B2b · Sales · Business-to-Business (B2B) · Sales Management · B2B Integration",
    startDate: "2021-06-01",
    endDate: "2021-08-01",
  },
  {
    year: "2019 - 2020",
    title: "Custoemr Service Agent",
    company: "Verkkokauppa.com Oyj",
    companyLogo: "img/vklogo.avif",
    description: "Attention to Detail · B2b · Sales · Business-to-Business (B2B) · Sales Management · B2B Integration",
    startDate: "2019-06-01",
    endDate: "2021-08-01",
  },
];

const skills: Skill[] = [
  { name: "C#", level: 90 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 80 },
];

export default function App() {
  const { isMobile } = useViewport();

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100 p-8">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Martin Negin</h1>
        <p className="text-cyan-400">Integration Specialist</p>
      </motion.header>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <NeumorphicCard>
          <h2 className="text-2xl mb-6 text-cyan-400">Work Experience</h2>
          <Timeline items={workExperience} />
        </NeumorphicCard>

        <NeumorphicCard>
          <h2 className="text-2xl mb-6 text-cyan-400">Technical Skills</h2>
          <SkillChart skills={skills} />
        </NeumorphicCard>

        <NeumorphicCard>
          <h2 className="text-2xl mb-6 text-cyan-400">GitHub Stats</h2>
          <GitHubStats />
        </NeumorphicCard>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mt-16 space-y-4"
      >
        <h3 className="text-xl">📫 ba@zroot.it</h3>
        <div className="flex justify-center gap-4">
          <a href="https://github.com/vem882" className="neumorphic-social">
            <img src="/github-icon.svg" alt="GitHub" className="w-8 h-8" />
          </a>
          <a href="https://yourblog.com" className="neumorphic-social">
            <img src="/blog-icon.svg" alt="Blog" className="w-8 h-8" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}