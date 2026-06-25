import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Send,
  GraduationCap,
  Briefcase,
  Layers,
  BookOpen,
  MessageSquare,
  Globe,
  Youtube,
  Trophy,
  Sun,
  Moon,
  FileText,
  Phone
} from 'lucide-react';

import AmaPage from './components/AmaPage';

// --- Types ---
interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    leetcode: string;
    blog: string;
    youtube: string;
  };
  education: { degree: string; institution: string; year: string }[];
  experience: { role: string; company: string; period: string; description: string }[];
  skills: { [key: string]: string[] };
  projects: { title: string; description: string; tags: string[]; link: string; image: string }[];
  research: { title: string; journal: string; year: string; link: string }[];
}

// --- Data ---
const PORTFOLIO_DATA: PortfolioData = {
  name: "Madhusudan Bhardwaj",
  title: "AI Research Scholar & Software Engineer",
  bio: "Specializing in Artificial Intelligence and Full-Stack Development. Currently exploring the frontiers of machine learning and intelligent systems at NSUT.",
  socials: {
    github: "https://github.com/MADHUSUDAN-82",
    linkedin: "https://www.linkedin.com/in/madhusudan-bhardwaj-352215224/",
    twitter: "https://x.com/MadhusudanBhar9",
    leetcode: "https://leetcode.com/u/madhusudan8287/",
    blog: "https://medium.com",
    youtube: "https://youtube.com"
  },
  education: [
    { degree: "M.Tech in Artificial Intelligence", institution: "Netaji Subhas University of Technology (NSUT), New Delhi", year: "2024 to 2026" },
    { degree: "B.Tech in Computer Science & Engineering", institution: "Krishna Engineering College (Affiliated with AKTU)", year: "2020 to 2024" }
  ],
  experience: [
    { 
      role: "AI/ML Intern (Generative AI & RAG Systems)", 
      company: "NimbusGaming", 
      period: "March 2024 - June 2024", 
      description: "Developed an AI-powered Retrieval-Augmented Generation (RAG) chatbot using Generative AI and semantic search to deliver accurate, context-aware responses. Implemented vector embeddings and similarity search integrated with Large Language Models (LLMs), significantly improving response relevance. Designed a context-aware response generation pipeline that enabled efficient information retrieval and intelligent query handling." 
    }
  ],
  skills: {
    languages: ["Python", "Java", "C/C++", "JavaScript"],
    libraries: ["TensorFlow", "Keras", "OpenCV", "Scikit-learn", "PyTorch"],
    concepts: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "DSA", "MCP", "RAG"],
    tools: ["Git", "VS Code", "Jupyter Notebook", "Google Colab", "Docker"],
    databases: ["MySQL", "PostgreSQL", "Vector Databases"]
  },
  projects: [
    { 
      title: "Openleaf", 
      description: "Agentic AI Research Paper Writer integrating LLMs with HITL (Human-in-the-Loop) to generate structured research drafts. Implemented MCP architecture for multi-step reasoning.", 
      tags: ["LangChain", "LangGraph", "LLMs", "HITL"], 
      link: "https://github.com/MADHUSUDAN-82/openleaf", 
      image: "https://picsum.photos/seed/openleaf/800/600" 
    },
    { 
      title: "SmartRAG", 
      description: "Intelligent RAG system featuring query rewriting, intent detection, and hybrid search (BM25 + FAISS) with web fallback.", 
      tags: ["Hybrid Search", "BM25", "FAISS", "Query AI"], 
      link: "https://smart-rag.vercel.app/", 
      image: "https://picsum.photos/seed/smartrag/800/600" 
    },
    { 
      title: "MediBot", 
      description: "AI-powered Medical RAG chatbot combining semantic search with LLMs. Implemented vector embeddings and context-aware generation for medical accuracy.", 
      tags: ["FAISS", "LangChain", "RAG", "LLMs"], 
      link: "https://madhusudan-82-medai-streamlit-app-xxbrfu.streamlit.app/", 
      image: "https://picsum.photos/seed/medibot/800/600" 
    },
    { 
      title: "DoctorG", 
      description: "Multi-Layer ANN model for multi-class disease prediction from symptoms. Features weighted feature engineering and softmax probability ranking.", 
      tags: ["TensorFlow", "NLP", "Scikit-Learn", "GenAI"], 
      link: "https://aidoctorg.streamlit.app/", 
      image: "https://picsum.photos/seed/doctorg/800/600" 
    }
    
  ],
  research: []
};

// --- Components ---

function ConnectButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerOpen();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const showPopup = isHovered || isOpen;

  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={triggerOpen}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={showPopup}
        aria-label="Connect and view contact channels"
        className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent hover:text-text-primary transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-accent/40 rounded px-2 py-1 -mx-2 -my-1"
      >
        Connect
        <motion.span
          animate={{ rotate: showPopup ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block text-[8px]"
        >
          ▼
        </motion.span>
      </button>

      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute left-0 mt-3 z-30 w-72 bg-bg-secondary/95 backdrop-blur-xl border border-border-subtle rounded-xl p-4 shadow-2xl transition-all duration-500"
        >
          <div className="space-y-3">
            <h4 className="text-[9px] font-mono tracking-widest text-accent uppercase mb-2">Direct Channels</h4>
            
            <a 
              href="mailto:madhusudanbhardwaj8287@gmail.com"
              aria-label="Send email to Madhusudan Bhardwaj"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/5 hover:text-accent text-text-primary transition-all text-xs focus:ring-1 focus:ring-accent/30"
            >
              <div className="p-2 bg-accent/5 rounded-full text-accent transition-colors">
                <Mail size={14} />
              </div>
              <span className="font-light truncate">madhusudanbhardwaj8287@gmail.com</span>
            </a>

            <a 
              href="tel:+918287031247"
              aria-label="Call Madhusudan Bhardwaj"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/5 hover:text-accent text-text-primary transition-all text-xs focus:ring-1 focus:ring-accent/30"
            >
              <div className="p-2 bg-accent/5 rounded-full text-accent transition-colors">
                <Phone size={14} />
              </div>
              <span className="font-light">+91 8287031247</span>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Section({ id, title, children }: { id: string, title?: string, children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 border-b border-border-subtle scroll-mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {title && (
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-serif italic text-accent mb-12 flex items-center gap-4"
          >
            {title}
            <div className="h-px bg-accent/20 flex-1 ml-4" />
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'warm'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('app-theme') as 'dark' | 'warm') || 'dark';
    }
    return 'dark';
  });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [activeChatTab, setActiveChatTab] = useState<'cypher' | 'neural'>('cypher');

  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHash: string) => {
    if (currentPath === '/ama') {
      e.preventDefault();
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setTimeout(() => {
        const el = document.getElementById(targetHash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const handleAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newChat = [...chatHistory, { role: 'user' as const, text: userInput }];
    setChatHistory(newChat);
    setUserInput("");
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput, context: PORTFOLIO_DATA }),
      });
      const data = await res.json();
      setChatHistory([...newChat, { role: 'ai' as const, text: data.text }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'warm') {
      root.classList.add('warm-theme');
    } else {
      root.classList.remove('warm-theme');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'warm' : 'dark');
  };

  useEffect(() => {
    const handleFirstClick = () => {
      document.removeEventListener('click', handleFirstClick);
    };
    document.addEventListener('click', handleFirstClick);
    return () => document.removeEventListener('click', handleFirstClick);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans selection:bg-accent/30 transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-bg-primary/90 backdrop-blur-xl border-b border-border-subtle">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-4">
            <h1 
              onClick={() => navigateTo('/')}
              className="text-2xl font-serif italic text-accent tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            >
              {PORTFOLIO_DATA.name}
            </h1>
          </div>
          
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] text-text-secondary/60 items-center font-semibold">
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-accent transition-colors">About</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-accent transition-colors">Projects</a>
            <a 
              href="/ama" 
              onClick={(e) => { e.preventDefault(); navigateTo('/ama'); }} 
              className={`hover:text-accent transition-colors tracking-[0.3em] uppercase ${currentPath === '/ama' ? 'text-accent font-bold border-b border-accent/40 pb-1' : ''}`}
            >
              AMA
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-accent transition-colors">Connect</a>
          </div>
 
          <div className="flex items-center gap-6">
            <a 
              href="/ama" 
              onClick={(e) => { e.preventDefault(); navigateTo('/ama'); }} 
              className={`md:hidden hover:text-accent transition-colors text-[10px] uppercase tracking-[0.2em] font-bold ${currentPath === '/ama' ? 'text-accent' : 'text-text-secondary/75'}`}
            >
              AMA
            </a>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-bg-secondary border border-border-subtle text-accent hover:bg-accent hover:text-bg-primary transition-all"
              title={theme === 'dark' ? 'Switch to Warm Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {currentPath === '/ama' ? (
        <AmaPage onBackToHome={() => navigateTo('/')} />
      ) : (
        <>
          {/* Hero Section */}
          <Section id="about">
        <div className="flex flex-col md:flex-row gap-16 items-center min-h-[70vh] justify-center mt-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <p className="text-xs tracking-[0.3em] uppercase text-text-secondary/40">{PORTFOLIO_DATA.title}</p>
              <h1 className="text-6xl md:text-7xl font-serif italic text-accent leading-[1.1] tracking-tight">
                Designing the <br /> 
                <span className="text-text-primary not-italic">Future of Web.</span>
              </h1>
            </div>
            <p className="max-w-md text-lg text-text-secondary leading-relaxed font-light">
              {PORTFOLIO_DATA.bio}
            </p>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex gap-4">
                <a href={PORTFOLIO_DATA.socials.github} target="_blank" className="p-3 bg-bg-secondary border border-border-subtle rounded-full hover:border-accent/40 hover:bg-accent/5 transition-all text-text-secondary hover:text-accent">
                  <Github size={18} />
                </a>
                <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" className="p-3 bg-bg-secondary border border-border-subtle rounded-full hover:border-accent/40 hover:bg-accent/5 transition-all text-text-secondary hover:text-accent">
                  <Linkedin size={18} />
                </a>
              </div>
              <div className="h-px w-20 bg-border-subtle" />
              <ConnectButton />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-accent/10 rounded-2xl -z-10" />
            <div className="group relative w-64 h-80 md:w-80 md:h-[480px] overflow-hidden rounded-xl border border-border-subtle">
              <img
                src="/Home.jpg"
                alt="Portrait"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Resume Section */}
      <Section id="resume" title="The Path.">
        <div className="grid md:grid-cols-2 gap-24">
          <div className="space-y-16">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-accent mb-10 flex items-center gap-4">
                Experience
                <div className="h-px bg-accent/20 flex-1" />
              </h3>
              <div className="space-y-12">
                {PORTFOLIO_DATA.experience.map((exp, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-text-primary text-lg font-medium group-hover:text-accent transition-colors">{exp.role}</h4>
                      <span className="text-[10px] font-mono text-text-secondary/40 uppercase tracking-[0.2em]">{exp.period}</span>
                    </div>
                    <p className="text-accent/60 text-xs italic font-serif mb-4">{exp.company}</p>
                    <p className="text-text-secondary/60 text-sm leading-relaxed border-l border-border-subtle pl-5">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-16">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-accent mb-10 flex items-center gap-4">
                Education
                <div className="h-px bg-accent/20 flex-1" />
              </h3>
              <div className="space-y-12">
                {PORTFOLIO_DATA.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-text-primary text-lg font-medium">{edu.degree}</h4>
                      <span className="text-[10px] font-mono text-text-secondary/40 uppercase tracking-[0.2em]">{edu.year}</span>
                    </div>
                    <p className="text-accent/60 text-xs italic font-serif">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {PORTFOLIO_DATA.research.length > 0 && (
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.3em] text-accent mb-10 flex items-center gap-4">
                  Publications
                  <div className="h-px bg-accent/20 flex-1" />
                </h3>
                <div className="space-y-6">
                  {PORTFOLIO_DATA.research.map((paper, i) => (
                    <a href={paper.link} key={i} className="group block bg-bg-secondary border border-border-subtle p-6 rounded-lg hover:border-accent/30 transition-all">
                      <h4 className="text-text-primary text-sm group-hover:text-accent font-serif italic leading-snug transition-colors">{paper.title}</h4>
                      <div className="flex justify-between mt-4 text-[9px] font-mono text-text-secondary/40 uppercase tracking-widest">
                        <span>{paper.journal}</span>
                        <span>{paper.year}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-32 pt-20 border-t border-border-subtle">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {Object.entries(PORTFOLIO_DATA.skills).map(([category, skills]) => (
              <div key={category} className="space-y-6">
                <h4 className="text-[10px] font-mono text-accent/40 uppercase tracking-[0.4em]">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="px-4 py-1.5 bg-bg-secondary border border-border-subtle rounded text-[11px] text-text-secondary hover:text-text-primary transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Exhibition.">
        <div className="grid md:grid-cols-2 gap-12">
          {PORTFOLIO_DATA.projects.map((project, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="group relative bg-bg-secondary border border-border-subtle rounded-2xl overflow-hidden"
            >
              <div className="aspect-[16/10] overflow-hidden grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[9px] font-mono text-accent/50 uppercase tracking-[0.3em] mb-2 block font-bold transition-colors group-hover:text-accent">Project {i+1}</span>
                    <h3 className="text-3xl font-serif italic text-text-primary tracking-tight">{project.title}</h3>
                  </div>
                  <a href={project.link} className="p-3 rounded-full border border-border-subtle hover:border-accent/40 hover:text-accent transition-all text-text-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <p className="text-text-secondary/60 text-sm mb-8 leading-relaxed font-light">{project.description}</p>
                <div className="flex gap-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-text-secondary/40 tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Social Links */}
      <Section id="socials" title="Nodes.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'GitHub', icon: Github, link: PORTFOLIO_DATA.socials.github, type: 'Code' },
            { label: 'LinkedIn', icon: Linkedin, link: PORTFOLIO_DATA.socials.linkedin, type: 'Network' },
            { label: 'LeetCode', icon: Trophy, link: PORTFOLIO_DATA.socials.leetcode, type: 'Algorithmic' },
            { label: 'X (Twitter)', icon: Twitter, link: PORTFOLIO_DATA.socials.twitter, type: 'Social' }
          ].map((social) => (
            <a 
              key={social.label} 
              href={social.link} 
              target="_blank" 
              className="group p-8 bg-bg-secondary border border-border-subtle rounded-xl hover:border-accent/30 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <social.icon size={22} className="text-text-secondary/40 group-hover:text-accent transition-colors" />
                <ExternalLink size={14} className="text-text-secondary/20 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
              <span className="block text-[10px] font-mono text-accent/30 uppercase tracking-[0.3em] mb-1">{social.type}</span>
              <span className="text-lg font-serif italic text-text-primary/80 group-hover:text-text-primary transition-colors">{social.label}</span>
            </a>
          ))}
        </div>
      </Section>

      {/* AI Assistant & Contact */}
      <Section id="contact" title="CONNECT">
        <div className="grid lg:grid-cols-5 gap-20">
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-6">
              <h3 className="text-5xl font-serif italic text-accent leading-tight">
                Pioneering the <br /> 
                <span className="text-text-primary not-italic">AI Frontier.</span>
              </h3>
              <p className="text-text-secondary leading-relaxed font-light text-lg">
                Specializing in Generative AI, Retrieval-Augmented Generation (RAG), and agentic systems. Open for research opportunities, engineering roles, and strategic partnerships.
              </p>
            </div>



            <div className="pt-6">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Open Resume PDF in a new tab"
                className="inline-block px-10 py-4 bg-accent text-white text-[10px] uppercase font-bold tracking-[0.3em] rounded hover:bg-accent-hover transition-all transform hover:-translate-y-1"
              >
                Open Resume PDF
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 bg-bg-secondary border border-border-subtle rounded-2xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[520px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-border-subtle">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/5 border border-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-text-primary">Dialogue</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    <span className="text-[9px] text-text-secondary/40 uppercase tracking-[0.2em]">Operational</span>
                  </div>
                </div>
              </div>

              {/* Tab selector */}
              <div className="flex bg-bg-primary/55 p-1 border border-border-subtle rounded-xl self-start sm:self-auto">
                <button
                  onClick={() => setActiveChatTab('cypher')}
                  className={`px-4 py-2 text-[9px] font-mono uppercase tracking-widest rounded-lg transition-all ${
                    activeChatTab === 'cypher'
                      ? 'bg-accent text-white font-bold shadow-md'
                      : 'text-text-secondary/60 hover:text-text-primary'
                  }`}
                >
                  Cypher (Ask Me)
                </button>
                <button
                  onClick={() => setActiveChatTab('neural')}
                  className={`px-4 py-2 text-[9px] font-mono uppercase tracking-widest rounded-lg transition-all ${
                    activeChatTab === 'neural'
                      ? 'bg-accent text-white font-bold shadow-md'
                      : 'text-text-secondary/60 hover:text-text-primary'
                  }`}
                >
                  Neural (Gemini)
                </button>
              </div>
            </div>

            {activeChatTab === 'cypher' ? (
              <div className="relative w-full rounded-xl border border-border-subtle bg-bg-primary/20 overflow-hidden transition-all duration-300">
                <iframe 
                  src="https://cypher.itsrishabh.tech/embed/Sudan" 
                  width="100%" 
                  height="540" 
                  style={{ border: 'none', borderRadius: '0px', background: 'transparent' }}
                  title="Ask Me Anything"
                />
              </div>
            ) : (
              <div className="flex flex-col justify-between flex-1">
                <div className="h-72 overflow-y-auto space-y-6 pr-2 mb-6 scrollbar-thin scrollbar-thumb-border-subtle">
                  {chatHistory.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-text-secondary/40 text-xs italic font-serif">Inquire about Madhusudan's RAG models, M.Tech research, or project architectures...</p>
                    </div>
                  )}
                  {chatHistory.map((msg, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-accent/5 border border-accent/20 text-accent/90 ml-10' 
                          : 'bg-bg-secondary border border-border-subtle text-text-secondary mr-10'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isAiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-bg-secondary border border-border-subtle p-4 rounded-xl flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAiChat} className="flex gap-4 mt-auto">
                  <input 
                    type="text" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask..."
                    className="flex-1 bg-bg-secondary border border-border-subtle rounded-lg px-6 py-4 text-sm focus:outline-none focus:border-accent/40 transition-colors placeholder:text-text-secondary/40 text-text-primary"
                  />
                  <button 
                    type="submit" 
                    disabled={isAiLoading}
                    className="bg-accent hover:bg-accent-hover disabled:bg-accent/30 text-white p-4 rounded-lg transition-all group shrink-0"
                  >
                    <Send size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </Section>
        </>
      )}

      <footer className="py-20 border-t border-border-subtle bg-bg-secondary/20">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="flex justify-center gap-8 mb-10 text-[9px] uppercase tracking-[0.4em] text-text-secondary/40">
            <span className="hover:text-accent transition-colors cursor-default">Privacy</span>
            <span className="hover:text-accent transition-colors cursor-default">Terms</span>
            <span className="hover:text-accent transition-colors cursor-default">Archive</span>
          </div>
          <p className="text-[10px] font-mono text-text-secondary/20 uppercase tracking-[0.5em]">
            © 2026 {PORTFOLIO_DATA.name} — Aesthetic Harmony in Execution
          </p>
        </div>
      </footer>
    </div>
  );
}
