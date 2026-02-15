import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Code2, 
  Cpu, 
  Globe, 
  Send, 
  Bot, 
  ChevronRight, 
  ExternalLink,
  MessageSquare,
  X,
  Sparkles,
  Award,
  Briefcase,
  Heart,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Layers,
  Cloud,
  Database,
  BrainCircuit,
  Settings,
  FileText,
  Calendar,
  MapPin
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

// --- Typing Effect Component ---
const TypingText = ({ phrases }: { phrases: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases]);

  return (
    <span className="text-cyan-400 font-medium tracking-wide">
      {phrases[index].substring(0, subIndex)}
      <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 align-middle cursor-blink"></span>
    </span>
  );
};

// --- Helper for Resume ---
const handleDownloadCV = () => {
  const resumeContent = `
SIDDHI DESHMUKH
Email: deshmukhsiddhi3104@gmail.com
LinkedIn: https://www.linkedin.com/in/siddhi-deshmukh-6a4336259/
Mobile: +91-7020388458
Github: https://github.com/SiddhiDeshmukh310

EDUCATION
• International Institute of Information Technology - Pune, India
  Bachelor of Engineering - Computer Engineering; CGPA: 9.15 / 10.0 | Nov 2022 - May 2026
  Relevant Courses: Data Structures and Algorithms, Artificial Intelligence, Computer Networks and Security, 
  Database Management Systems, Discrete Mathematics, backend development

SKILLS SUMMARY
• Languages: Python, C++, Java, Html5, CSS3, JavaScript, ReactJS, NextJS, Node.js
• Frameworks: Langgraph, Scikit, NLTK, PyTorch, TensorFlow, Flask, FastAPI
• AI/ML Skills: Generative AI, Machine Learning, Deep Learning, NLP, RAG, CNN, 
  Prompt Engineering, Agentic AI, Model Context Protocol
• Databases: SQL: MySQL, OracleDB, SQLite | NoSQL: MongoDB
• Tools: GIT, GitHub, Docker
• Cloud: AWS, Firebase

EXPERIENCE
• AI-ML Developer Intern | Vtex.AI | Feb 2026 – Present
• AI-ML Virtual Internship | Remote | 01/2025 – 03/2025

PROJECTS
• Student Grading System: Web-based application for student records and grade calculation. MySQL, PHP, HTML5, CSS3, JS.
• Gym Management System: User-friendly platform for workout/diet tracking and membership. HTML5, CSS3, JS, PHP, MySQL.
• Automated Book Publication System: AI workflow with LangChain, multi-agent execution, and ChromaDB. Python, FastAPI, GitHub.
• ECG Monitoring & Analysis System: Real-time visualization and ML-based anomaly detection for ECG signals. Python, Scikit-Learn, FastAPI.

ACTIVITIES AND LEADERSHIP
• Smart India Hackathon 2024 (Level 2): Engineered AI Gym Management with CV-based pose-estimation.
• Smart India Hackathon 2025: Developed AI-assisted interactive game system for learning.
• MIT-WPU Hackathon: Built cloud-based solutions for women-centric challenges using AWS.
• L'Oréal Brandstorm: International competition in beauty-tech innovations using AI.
• NGO Volunteering: Education and technology access workshops for underprivileged communities.
  `;

  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Siddhi_Deshmukh_Resume.txt');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-2 glass rounded-full border border-white/10 w-fit">
    <div className="flex items-center gap-12">
      <div className="text-xl font-black text-cyan-400 tracking-tight">SD</div>
      <div className="hidden md:flex gap-8 text-[13px] font-medium text-slate-400 items-center">
        <a href="#home" className="hover:text-white transition-colors">Home</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#skills" className="hover:text-white transition-colors">Skills</a>
        <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>
      <button 
        onClick={handleDownloadCV}
        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl button-glow hover:scale-105 transition-transform"
      >
        <FileText className="w-3.5 h-3.5" /> Resume
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section id="home" className="relative min-h-screen pt-48 pb-20 px-6 flex flex-col items-center">
    <div className="dot-glow top-40 left-1/4 animate-pulse"></div>
    <div className="dot-glow top-80 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
    
    <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-10 bg-cyan-500/5">
        <Sparkles className="w-3.5 h-3.5" />
        Open to Opportunities
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 ml-1"></div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 flex flex-wrap justify-center gap-x-4 items-baseline">
        <span className="text-white">Hi, I'm</span>
        <span className="gradient-text hero-glow text-6xl md:text-8xl">Siddhi</span>
      </h1>
      
      <div className="text-2xl md:text-4xl font-medium mb-10 min-h-[40px]">
        <TypingText phrases={["Problem Solver", "AI/ML Engineer", "Java Developer"]} />
      </div>

      <div className="glass p-8 rounded-3xl border-white/10 max-w-2xl mb-12">
        <p className="text-slate-400 text-lg leading-relaxed">
          Computer Engineering undergraduate with a passion for building <span className="text-cyan-400">intelligent systems</span> and <span className="text-purple-400">scalable cloud solutions</span>. I combine strong mathematical foundations with creative problem-solving.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-16">
        <a href="#projects" className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold rounded-2xl transition-all flex items-center gap-2 button-glow hover:scale-105">
          View Projects <ArrowRight className="w-4 h-4" />
        </a>
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
          className="px-10 py-4 border border-slate-700 hover:border-slate-500 rounded-2xl font-bold transition-all bg-slate-900/50"
        >
          Contact Me
        </button>
      </div>

      <div className="flex flex-col items-center gap-6">
        <span className="text-slate-600 text-[10px] uppercase font-bold tracking-[0.3em]">Connect with me</span>
        <div className="flex gap-4">
          <a href="https://github.com/SiddhiDeshmukh310" target="_blank" className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-cyan-500/10 transition-colors border-white/5">
            <Github className="w-6 h-6 text-slate-400" />
          </a>
          <a href="https://linkedin.com/in/siddhi-deshmukh-6a4336259" target="_blank" className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-cyan-500/10 transition-colors border-white/5">
            <Linkedin className="w-6 h-6 text-slate-400" />
          </a>
          <a href="mailto:deshmukhsiddhi3104@gmail.com" className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-cyan-500/10 transition-colors border-white/5">
            <Mail className="w-6 h-6 text-slate-400" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col items-center text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 text-purple-400 text-xs font-bold mb-6 bg-purple-500/5">
        <Sparkles className="w-3.5 h-3.5" />
        About Me
      </div>
      <h2 className="text-5xl md:text-6xl font-bold mb-16 tracking-tight">
        Get to know <span className="text-cyan-400">who</span> I <span className="text-purple-400">am</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
      <div className="glass p-10 rounded-[40px] border-white/5 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">My Journey</h3>
        </div>
        <div className="text-slate-400 text-lg leading-relaxed space-y-4">
          <p>
            I'm a Computer Engineering undergraduate at the <span className="text-white font-bold">International Institute of Information Technology, Pune</span>, with a deep passion for AI, Machine Learning, and Cloud Technologies.
          </p>
          <p>
            Beyond the world of code, I find inspiration in <span className="text-purple-400">fashion design</span>, <span className="text-purple-400">reading</span>, and <span className="text-purple-400">writing technical blogs</span>. I believe creativity and technical thinking go hand in hand.
          </p>
          <p>
            Currently focused on <span className="text-cyan-400">Generative AI</span>, <span className="text-cyan-400">Agentic AI systems</span>, and building scalable cloud solutions that can make a meaningful impact.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="glass p-10 rounded-[40px] border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Education</h3>
          </div>
          <div className="bg-slate-900/40 p-6 rounded-3xl border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xl font-bold">Bachelor of Engineering</h4>
              <span className="text-xs font-bold px-3 py-1 bg-cyan-500/10 rounded-full text-cyan-400 border border-cyan-500/20">2022 - 2026</span>
            </div>
            <p className="text-slate-300 font-medium mb-1">Computer Engineering</p>
            <p className="text-slate-500 text-sm mb-6">International Institute of Information Technology, Pune</p>
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-6 py-3 rounded-2xl w-fit border border-white/10">
              <span className="text-cyan-400 font-bold">CGPA: 9.15 / 10.0</span>
            </div>
          </div>
        </div>

        <div className="glass p-10 rounded-[40px] border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Relevant Coursework</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Data Structures & Algorithms", "Artificial Intelligence", "DBMS", "Computer Networks & Security", "Discrete Mathematics", "Backend Development"].map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skillCategories = [
    { 
      title: "Programming Languages", 
      icon: <Code2 className="w-6 h-6" />,
      list: ["Python", "C++", "Java", "HTML5", "CSS3", "JavaScript"] 
    },
    { 
      title: "Frameworks & Libraries", 
      icon: <Settings className="w-6 h-6" />,
      list: ["ReactJS", "NextJS", "Node.js", "Flask", "FastAPI", "LangGraph", "PyTorch", "TensorFlow", "Scikit-learn", "NLTK"] 
    },
    { 
      title: "AI/ML Expertise", 
      icon: <BrainCircuit className="w-6 h-6" />,
      list: ["Generative AI", "Machine Learning", "Deep Learning", "NLP", "RAG", "CNNs", "Prompt Engineering", "Agentic AI", "Model Context Protocol"] 
    },
    { 
      title: "Databases", 
      icon: <Database className="w-6 h-6" />,
      list: ["MySQL", "OracleDB", "SQLite", "MongoDB"] 
    },
    { 
      title: "Cloud & Tools", 
      icon: <Cloud className="w-6 h-6" />,
      list: ["AWS", "Firebase", "Git", "GitHub", "Docker"] 
    },
  ];

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-6 bg-cyan-500/5">
            <Cpu className="w-3.5 h-3.5" />
            Technical Skills
          </div>
          <h2 className="text-6xl md:text-7xl font-bold">My <span className="text-cyan-400">Tech</span> <span className="text-purple-400">Stack</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => (
            <div key={i} className="glass p-10 rounded-[40px] border-white/5 hover:bg-white/5 transition-all group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold leading-tight">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.list.map(s => (
                  <span key={s} className="px-4 py-2 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-sm text-cyan-400/90 hover:bg-cyan-500/20 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => (
  <section id="experience" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col items-center text-center mb-20">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 text-purple-400 text-xs font-bold mb-6 bg-purple-500/5">
        <Briefcase className="w-3.5 h-3.5" />
        Experience
      </div>
      <h2 className="text-6xl md:text-7xl font-bold">Professional <span className="text-purple-400">Journey</span></h2>
    </div>

    <div className="space-y-12">
      {/* New Vtex.AI Internship - Most Recent */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition-all"></div>
        <div className="relative glass p-10 rounded-[40px] border-white/10 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">AI-ML Developer Intern</h3>
                <h4 className="text-xl font-medium text-slate-300">Vtex.AI</h4>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white/5 rounded-2xl text-slate-400 text-sm flex items-center gap-2 border border-white/5">
                <Calendar className="w-4 h-4" /> Feb 16, 2026 – Present
              </span>
              <span className="px-4 py-2 bg-white/5 rounded-2xl text-slate-400 text-sm flex items-center gap-2 border border-white/5">
                <MapPin className="w-4 h-4" /> Pune, India
              </span>
            </div>
          </div>
          
          <ul className="space-y-4 text-slate-400 text-lg">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2.5 flex-shrink-0"></div>
              <span>Developing and integrating AI/ML models for real-world applications</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2.5 flex-shrink-0"></div>
              <span>Working on generative AI features, data pipelines, and model deployment</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2.5 flex-shrink-0"></div>
              <span>Collaborating with team to build scalable AI solutions (updates as internship progresses)</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-3">
            {["Python", "Machine Learning", "Generative AI", "FastAPI", "PyTorch / TensorFlow"].map(tech => (
              <span key={tech} className="px-5 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-300 text-sm font-bold">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Previous Virtual Internship */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition-all"></div>
        <div className="relative glass p-10 rounded-[40px] border-white/10 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">AI-ML Virtual Internship</h3>
                <h4 className="text-xl font-medium text-slate-300">Intern</h4>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white/5 rounded-2xl text-slate-400 text-sm flex items-center gap-2 border border-white/5">
                <Calendar className="w-4 h-4" /> Jan 2025 – Mar 2025
              </span>
              <span className="px-4 py-2 bg-white/5 rounded-2xl text-slate-400 text-sm flex items-center gap-2 border border-white/5">
                <MapPin className="w-4 h-4" /> Remote
              </span>
            </div>
          </div>
          
          <ul className="space-y-4 text-slate-400 text-lg">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2.5 flex-shrink-0"></div>
              <span>Developed AI models using Python and TensorFlow framework</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2.5 flex-shrink-0"></div>
              <span>Improved machine learning algorithms through rigorous data analysis</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2.5 flex-shrink-0"></div>
              <span>Researched AI trends to enhance project outcomes and performance</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-3">
            {["Python", "TensorFlow", "Data Analysis", "ML"].map(tech => (
              <span key={tech} className="px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 text-sm font-bold">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group glass rounded-3xl p-8 transition-all hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer border-white/5 flex flex-col h-full">
    <div className="flex justify-between items-start mb-6">
      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
        <Code2 className="w-7 h-7" />
      </div>
      <div className="flex gap-2 flex-wrap justify-end">
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] font-black px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full text-cyan-200 border border-white/10 uppercase tracking-tighter">
            {tag}
          </span>
        ))}
      </div>
    </div>
    <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors flex justify-between items-center">
      {project.title}
      <ExternalLink className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-all" />
    </h3>
    <p className="text-slate-400 leading-relaxed text-base flex-grow">
      {project.description}
    </p>
    <a 
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium self-start"
    >
      View on GitHub <ExternalLink className="w-4 h-4" />
    </a>
  </div>
);

const Projects = () => {
  const projects: Project[] = [
    {
      title: "Automated Book Publication System",
      description: "AI-powered workflow automation: scrapes content, rewrites via LLMs, human-in-loop feedback, multi-agent system & RAG for quality output.",
      tags: ["Python", "LangChain", "FastAPI", "ChromaDB", "RAG"],
      link: "https://github.com/SiddhiDeshmukh310/automated-book-publication-system"
    },
    {
      title: "ECG Monitoring & Analysis System",
      description: "Real-time ECG signal processing, ML-based anomaly detection (e.g. arrhythmia), interactive visualization dashboard.",
      tags: ["Python", "Scikit-Learn", "NumPy", "Pandas", "FastAPI"],
      link: "https://github.com/SiddhiDeshmukh310/ecg-monitoring-analysis-system"
    },
    {
      title: "AI Gym Management with Pose Estimation",
      description: "Computer vision system for real-time exercise posture correction using pose estimation — built for SIH 2024.",
      tags: ["OpenCV", "MediaPipe", "JavaScript", "MySQL"],
      link: "https://github.com/SiddhiDeshmukh310/ai-gym-pose-estimation-sih"
    },
    {
      title: "Student Grading System",
      description: "Full-stack web app for managing student records, automatic grade calculation, and report generation.",
      tags: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
      link: "https://github.com/SiddhiDeshmukh310/student-grading-system"
    },
    {
  title: "Robotics-Based [Your Solution Name, e.g., Smart Waste Sorter / Assistive Robot]",
  description: "Developed a robotics solution during MIT-WPU Hackathon: [brief what it does, e.g., autonomous robot using computer vision and ML for object detection/sorting, integrated with ROS or Arduino + camera feed]. Focused on real-time processing and hardware-software integration to solve [problem, e.g., waste management / elderly assistance].",
  tags: ["Robotics", "Computer Vision", "Python", "OpenCV / MediaPipe", "Hackathon"],
  link: "https://github.com/SiddhiDeshmukh310/robotics-mit-hackathon-[year]"  // e.g., robotics-mit-wpu-2025
},
{
  title: "Real-Time Collaborative Whiteboard",
  description: "Built a multiplayer online whiteboard for real-time drawing, shapes, text, sticky notes, and collaboration. Features include live cursor tracking, undo/redo, and persistent sessions using WebSockets for seamless multi-user interaction.",
  tags: ["React", "TypeScript", "Socket.io", "Canvas", "Real-Time"],
  link: "https://github.com/SiddhiDeshmukh310/realtime-collaborative-whiteboard"
},
{
  title: "Conversational Storytelling Bot for Children",
  description: "LLM-powered interactive storytelling agent that generates personalized, age-appropriate stories with branching choices, moral lessons, and session memory. Includes safety filters to ensure child-friendly content, voice input/output options, and adaptive narratives based on user preferences.",
  tags: ["Generative AI", "LLM", "LangChain / OpenAI", "Python", "Streamlit / React"],
  link: "https://github.com/SiddhiDeshmukh310/ai-storytelling-bot-children"
},
  ];

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Featured <span className="text-cyan-400">Creations</span></h2>
        <p className="text-slate-500 max-w-xl mx-auto">Selected works demonstrating expertise in AI integration and full-stack development.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
      </div>
    </section>
  );
};

const Achievements = () => (
  <section id="achievements" className="py-32 px-6 max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold mb-16 text-center">Global <span className="text-cyan-400">Recognition</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {[
        { title: "Smart India Hackathon 2024", badge: "LEVEL 2", desc: "Engineered AI Gym Management with CV-based pose-estimation for real-time posture analysis." },
        { title: "Smart India Hackathon 2025", badge: "PARTICIPANT", desc: "Developed AI-assisted interactive game system focused on learning and ML-based personalization." },
        { title: "MIT-WPU Hackathon", badge: "AWS + ZENSAR", desc: "Built end-to-end cloud solutions addressing women-centric challenges using cloud-based services." },
        { title: "L'Oréal Brandstorm", badge: "INTERNATIONAL", desc: "Collaborated on innovative beauty-tech solutions combining AI and sustainability." }
      ].map((item, i) => (
        <div key={i} className="glass p-10 rounded-3xl border-white/5 relative group hover:border-cyan-500/30 transition-all">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 group-hover:opacity-20 transition-all">
            <Award className="w-24 h-24 text-cyan-400" />
          </div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <span className="text-[10px] font-black px-3 py-1 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">{item.badge}</span>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: "Hi! I'm Siddhi's AI double. Ask me about her education at IIIT Pune, her AI-ML internship at Vtex.AI, her projects, or her SIH hackathon experiences!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = messages.map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: userMsg.content }] }],
        config: {
          systemInstruction: `You are the AI Persona of Siddhi Deshmukh. 
          Background: Computer Engineering student at IIIT Pune (2022-2026), CGPA 9.15.
          Current Experience: AI-ML Developer Intern at Vtex.AI (Feb 2026 – Present).
          Previous: AI-ML Virtual Intern (Jan-Mar 2025).
          Projects: Automated Book Publication (LangChain/RAG), ECG Monitoring (ML anomaly detection), AI Gym Pose Estimation (SIH), Student Grading System, Personal Portfolio.
          Top Achievements: SIH 2024 Level 2, SIH 2025 Participant, MIT-WPU Hackathon, L'Oréal Brandstorm.
          Technical Stack: Python, React, Next.js, FastAPI, GenAI, RAG, TensorFlow/PyTorch.
          Tone: Ambitious, technical, and highly professional. 
          Answer questions about Siddhi's background, internships, technical skills, and projects. Keep responses concise and accurate.`,
        }
      });

      const aiText = response.text || "I'm having trouble connecting to my neural network. Try asking about my Vtex.AI internship or projects!";
      setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: "Oops, my circuits got crossed." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 text-slate-950 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[100]"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-32 right-10 w-[90vw] md:w-[400px] h-[600px] glass rounded-3xl shadow-2xl z-[100] flex flex-col overflow-hidden border-white/10">
          <div className="p-6 border-b border-white/10 bg-cyan-500/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold">Siddhi's AI Persona</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-black">Neural Engine Active</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-cyan-500 text-slate-950 rounded-br-none font-medium' 
                    : 'bg-white/5 border border-white/10 rounded-bl-none text-slate-300'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-cyan-500/50 uppercase font-black tracking-widest px-4">AI is thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 border-t border-white/10 flex gap-3 bg-slate-950/40">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button onClick={handleSend} className="w-12 h-12 bg-cyan-500 text-slate-950 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Footer = () => (
  <footer id="contact" className="py-32 px-6 border-t border-white/5 bg-slate-950/20">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-slate-950 mb-12 shadow-2xl shadow-cyan-500/20">
        <Mail className="w-10 h-10" />
      </div>
      <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
        Let's bridge the gap <br />
        <span className="gradient-text">between Ideas and AI.</span>
      </h2>
      <p className="text-slate-500 text-xl max-w-xl mb-12">
        Currently available for full-time software engineering roles and AI consultancy.
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 mb-20">
        <a href="mailto:deshmukhsiddhi3104@gmail.com" className="px-12 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-cyan-400 transition-all flex items-center gap-3 text-lg">
          Email Me <ChevronRight className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/siddhi-deshmukh-6a4336259" target="_blank" className="px-12 py-5 glass border border-white/10 text-white font-black rounded-2xl hover:bg-white/5 transition-all text-lg">
          LinkedIn
        </a>
      </div>

      <div className="flex flex-col items-center gap-4 text-slate-600 font-bold uppercase tracking-[0.4em] text-[10px]">
        <span>Siddhi Deshmukh</span>
        <span className="w-1 h-1 rounded-full bg-slate-800"></span>
        <span>IIIT Pune • 2026</span>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Footer />
      <AIChat />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);