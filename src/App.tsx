/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ShieldCheck, 
  Award, 
  Users, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  Star,
  Quote
} from 'lucide-react';

// --- Types ---
interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
}

// --- Data ---
const COURSES: Course[] = [
  {
    id: 'cqs-mandatory',
    title: 'CQS Mandatory Training 2024',
    category: 'Accreditation',
    description: 'Essential core training modules required for Law Society CQS accreditation and re-accreditation.',
    price: '£145',
    duration: '6 Modules',
    icon: <ShieldCheck className="w-6 h-6 text-brand-primary" />
  },
  {
    id: 'aml-compliance',
    title: 'AML & Financial Crime',
    category: 'Compliance',
    description: 'Stay ahead of regulation with comprehensive Anti-Money Laundering training specifically for conveyancers.',
    price: '£95',
    duration: '2.5 Hours',
    icon: <TrendingUp className="w-6 h-6 text-brand-primary" />
  },
  {
    id: 'client-care',
    title: 'Excellence in Client Care',
    category: 'Practice',
    description: 'Transform client relationships and improve satisfaction scores through better communication and standards.',
    price: '£120',
    duration: '4 Modules',
    icon: <Users className="w-6 h-6 text-brand-primary" />
  },
  {
    id: 'risk-management',
    title: 'Risk Management for Firms',
    category: 'Leadership',
    description: 'Identify, assess, and mitigate operational risks in your legal practice with expert frameworks.',
    price: '£180',
    duration: 'Day Workshop',
    icon: <Award className="w-6 h-6 text-brand-primary" />
  }
];

const FEATURES = [
  {
    title: "Expert Instruction",
    desc: "Courses led by senior legal professionals with decades of conveyancing experience.",
    icon: <Users className="w-8 h-8" />
  },
  {
    title: "Always Compliant",
    desc: "Our content is updated weekly to match the latest Law Society and SRA regulations.",
    icon: <ShieldCheck className="w-8 h-8" />
  },
  {
    title: "Flexible Learning",
    desc: "State-of-the-art LMS that allows your team to learn at their own pace, on any device.",
    icon: <BookOpen className="w-8 h-8" />
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-300">
            <Award className="w-6 h-6 text-black -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">CQS<span className="text-brand-primary">TRAINING</span></span>
        </motion.div>

        <div className="hidden md:flex gap-10">
          {['Courses', 'About', 'Solutions', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-gray-400 hover:text-brand-primary transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block bg-brand-primary text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(197,255,74,0.3)]"
        >
          Portal Login
        </motion.button>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-card border-b border-brand-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {['Courses', 'About', 'Solutions', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-lg font-bold text-white">{item}</a>
              ))}
              <button className="bg-brand-primary text-black w-full py-4 rounded-xl font-bold">Portal Login</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CourseCard: React.FC<{ course: Course; index: number }> = ({ course, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15 }}
    className="group bg-brand-card border border-brand-border p-8 rounded-3xl hover:border-brand-primary/50 transition-all duration-500 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
      {course.icon}
    </div>
    
    <div className="relative z-10">
      <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">
        {course.category}
      </span>
      <h3 className="text-xl font-bold mt-6 mb-3 text-white group-hover:text-brand-primary transition-colors leading-tight">
        {course.title}
      </h3>
      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
        {course.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="text-2xl font-black text-white">{course.price}</span>
          <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Per Member</p>
        </div>
        <button className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-black transition-all">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-gray-200 overflow-x-hidden selection:bg-brand-primary selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">2024 CQS Standards Live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8"
          >
            ELEVATE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-400">PRACTICE STANDARDS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The UK’s leading specialized provider for Law Society Conveyancing Quality Scheme training. Secure, compliant, and accredited.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="bg-brand-primary text-black h-16 px-10 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(197,255,74,0.35)] flex items-center gap-3">
              Browse Courses <ChevronRight className="w-5 h-5" />
            </button>
            <button className="h-16 px-10 rounded-2xl font-bold text-white border border-brand-border hover:bg-white/5 transition-colors">
              Our Methodology
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
        >
          {[
            { label: 'Accredited Firms', val: '2,500+' },
            { label: 'Total Learners', val: '40k+' },
            { label: 'Pass Rate', val: '99.8%' },
            { label: 'SRA Compliant', val: '100%' }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-black text-white">{stat.val}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-32 px-6 bg-brand-bg relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">MANDATORY MODULES</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Complete your Law Society compliance requirements with our streamlined, engaging training modules.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-brand-primary rounded-3xl p-8 flex flex-col justify-center items-center text-center border-4 border-black"
            >
              <BookOpen className="w-12 h-12 text-black mb-6" />
              <h3 className="text-2xl font-black text-black leading-tight mb-4">CUSTOM TEAM BUNDLES</h3>
              <p className="text-black/70 mb-8 font-bold">Training for 20+ members? Get a tailored corporate quote.</p>
              <button className="bg-black text-white w-full py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                Get a Quote
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="solutions" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(197,255,74,0.03)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-tight">
              WHY FIRMS CHOOSE <br />
              <span className="text-brand-primary">CQS TRAINING</span>
            </h2>
            <div className="space-y-10">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-16 h-16 shrink-0 bg-brand-card border border-brand-border rounded-2xl flex items-center justify-center text-brand-primary">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{f.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-brand-card border border-brand-border p-8 rounded-[40px] relative"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/20 blur-[60px] rounded-full" />
            <div className="space-y-6">
              <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full overflow-hidden" />
                  <div>
                    <p className="text-white font-bold">Compliance Status</p>
                    <p className="text-[10px] text-gray-500 uppercase">Real-time Dashboard</p>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-brand-primary" 
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-brand-primary font-bold">85% COMPLETE</span>
                  <span className="text-[10px] text-gray-400">12/14 MODULES</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border">
                  <CheckCircle2 className="w-6 h-6 text-brand-primary mb-3" />
                  <p className="text-2xl font-black text-white">Certificates</p>
                  <p className="text-xs text-gray-500">Auto-generated</p>
                </div>
                <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border">
                  <TrendingUp className="w-6 h-6 text-cyan-400 mb-3" />
                  <p className="text-2xl font-black text-white">Progress</p>
                  <p className="text-xs text-gray-500">Team Analytics</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-brand-card">
        <div className="max-w-7xl mx-auto text-center">
          <Quote className="w-16 h-16 text-brand-primary/20 mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-20 uppercase">Student Voices</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "The most engaging CQS training we've experienced. Clear, concise, and incredibly relevant to daily practice.", name: "Sarah J.", role: "Senior Partner" },
              { text: "Fantastic interface. I completed all my modules over a weekend. The certificates were instantly available.", name: "Mark T.", role: "Associate Solicitor" },
              { text: "Makes Law Society compliance painless. The annual updates are the highlight of our risk strategy.", name: "Helena G.", role: "COLP" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-brand-bg p-10 rounded-[32px] border border-brand-border text-left"
              >
                <div className="flex gap-1 mb-6 text-brand-primary">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-300 italic mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full" />
                  <div>
                    <p className="text-white font-bold">{t.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-primary to-cyan-400 p-20 rounded-[50px] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-10">
              <Award className="w-96 h-96 -rotate-12" />
          </div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-7xl font-black text-black tracking-tighter leading-none mb-8">
              READY TO SECURE <br /> YOUR ACCREDITATION?
            </h2>
            <p className="text-black/60 text-lg md:text-xl font-bold max-w-xl mx-auto mb-12">
              Join 2,500+ law firms who trust CQS Training for their mandatory Law Society requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="bg-black text-white h-16 px-12 rounded-2xl font-black text-lg hover:scale-105 transition-transform">
                Get Started Now
              </button>
              <button className="h-16 px-12 rounded-2xl font-bold text-black border border-black/20 bg-white/10">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-brand-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <div className="flex items-center gap-2 group mb-6 justify-center md:justify-start">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center rotate-45">
                <Award className="w-5 h-5 text-black -rotate-45" />
              </div>
              <span className="text-lg font-black tracking-tighter text-white">CQS<span className="text-brand-primary">TRAINING</span></span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              Providing the standard for Law Society Conveyancing Quality Scheme training since 2012.
            </p>
          </div>
          
          <div className="flex gap-20">
            <div>
              <p className="text-white font-bold mb-4">Platform</p>
              <ul className="text-gray-500 text-sm space-y-2">
                <li><a href="#" className="hover:text-brand-primary transition-colors">Course Catalog</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Portal Login</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-bold mb-4">Support</p>
              <ul className="text-gray-500 text-sm space-y-2">
                <li><a href="#" className="hover:text-brand-primary transition-colors">LMS Documentation</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Technical Support</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">T&Cs</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-brand-border/50 text-center">
          <p className="text-xs text-gray-600 font-bold tracking-widest uppercase">© 2024 CQS TRAINING LTD. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
