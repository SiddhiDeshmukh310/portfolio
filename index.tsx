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
  Bachelor of Engineering - Computer Engineering; GPA: 8.91 | Nov 2022 - May 2026
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
• AI-ML Virtual Internship | Remote
  Intern | 01/2025 – 03/2025
  Developed AI models using Python and TensorFlow, improved machine learning algorithms 
  through data analysis, and researched AI trends to enhance project outcomes.

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
              <span className="text-cyan-400 font-bold">GPA: 8.91</span>
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
      <ExternalLink className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-all