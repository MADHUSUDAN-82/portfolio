import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Sparkles, 
  Cpu, 
  GraduationCap, 
  HelpCircle,
  Briefcase,
  ExternalLink
} from 'lucide-react';

interface AmaItem {
  id: string;
  category:  'projects' |  'personal';
  question: string;
  answer: string;
}

const AMA_ITEMS: AmaItem[] = [
  {
    id: "hobbies",
    category: "personal",
    question: "what is your hobbies",
    answer: "gaming, writing tech posts, and building agentic AI projects"
  },
  {
    id: "openleaf-project",
    category: "projects",
    question: "How does Openleaf automate research paper drafting?",
    answer: "It combines multi-step reasoning models with Human-in-the-Loop integration and Model Context Protocol to write structured drafts."
  },
  
  
];

interface AmaPageProps {
  onBackToHome: () => void;
}

export default function AmaPage({ onBackToHome }: AmaPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'projects' |  'personal'>('all');

  const filteredItems = selectedCategory === 'all' 
    ? AMA_ITEMS 
    : AMA_ITEMS.filter(item => item.category === selectedCategory);

  const getIframeUrl = (q: string, a: string) => {
    return `https://cypher.itsrishabh.tech/embed/card?q=${encodeURIComponent(q)}&a=${encodeURIComponent(a)}`;
  };

  const categories = [
    { id: 'all', name: 'All cards', icon: HelpCircle },
    { id: 'projects', name: 'Projects', icon: Cpu },
    { id: 'personal', name: 'Personal', icon: Sparkles },
  ] as const;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBackToHome}
          className="group flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-text-secondary/60 hover:text-accent transition-colors mb-12 focus:outline-none focus:ring-1 focus:ring-accent/40 rounded px-2 py-1 -ml-2"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </motion.button>

        {/* Hero Section */}
        <div className="max-w-3xl space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/5 border border-accent/15 rounded-full text-[10px] font-mono uppercase tracking-widest text-accent mb-4">
              <Sparkles size={10} className="animate-pulse" />
              Interactive Cypher Embeds
            </div>
            <h2 className="text-5xl md:text-6xl font-serif italic text-accent leading-tight tracking-tight">
              Ask Me <br />
              <span className="text-text-primary not-italic">Anything.</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-text-secondary leading-relaxed font-light"
          >
            A curated showcase of dialogue cards embedding answers about my research, engineering background, and projects. Tapping or hovering reveals interactive details from my virtual agent.
          </motion.p>
        </div>

        {/* Category Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-accent border-accent text-white font-bold shadow-lg shadow-accent/15'
                    : 'bg-bg-secondary/40 border-border-subtle text-text-secondary/60 hover:text-text-primary hover:border-accent/30'
                }`}
              >
                <Icon size={12} />
                {cat.name}
              </button>
            );
          })}
        </motion.div>

        {/* Grid of cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={item.id}
              className="bg-bg-secondary/20 hover:bg-bg-secondary/50 border border-border-subtle rounded-2xl p-4 relative overflow-hidden group hover:border-accent/25 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category label */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] font-mono uppercase tracking-widest text-accent/80 font-bold bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                  {item.category}
                </span>
                <span className="text-[8px] font-mono text-text-secondary/30">ID: {item.id}</span>
              </div>

              {/* Iframe wrapper with rounded bounds to avoid overlay issues */}
              <div className="w-full rounded-xl overflow-hidden bg-bg-primary/10 border border-border-subtle/40">
                <iframe 
                  src={getIframeUrl(item.question, item.answer)} 
                  width="100%" 
                  height={220} 
                  style={{ border: 'none', borderRadius: '0px', background: 'transparent' }}
                  title={`AMA: ${item.question}`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live interaction footer section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-secondary/35 border border-border-subtle rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6"
        >
          <div className="w-12 h-12 bg-accent/5 border border-accent/20 rounded-full flex items-center justify-center text-accent mx-auto">
            <MessageSquare size={20} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-serif italic text-text-primary">Have another question in mind?</h4>
            <p className="text-sm text-text-secondary/70 leading-relaxed max-w-md mx-auto">
              You can interact with my virtual assistant in real-time or submit direct questions on the main page.
            </p>
          </div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-xs font-mono uppercase tracking-widest rounded-xl transition-all font-bold shadow-lg shadow-accent/15"
          >
            Try Chat on Home
            <ExternalLink size={12} />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
