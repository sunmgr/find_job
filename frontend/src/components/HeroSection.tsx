import React from 'react';
import { Sparkles, ArrowRight, Play, Link } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-codedex-cream pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="z-10 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-codedex-yellow border-[3px] border-black px-4 py-1 mb-8 shadow-brutal -rotate-2">
            <Sparkles size={16} fill="black" />
            <span className="font-extrabold uppercase tracking-widest text-[10px]">
              New Season: Semester 2026
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-[900] italic uppercase tracking-tighter leading-[0.9] mb-6">
            Level Up Your <br />
            <span className="text-codedex-purple">Grades & Wallet.</span>
          </h1>

          <p className="text-xl font-bold text-slate-700 max-w-lg mb-10 leading-relaxed">
            The ultimate student marketplace. Solve academic quests, earn real-world bounties, and build your legendary portfolio.
          </p>

          <div className="flex flex-wrap gap-6">
            {/* Primary Action */}
            <button className="group relative bg-codedex-purple text-white px-10 py-4 font-extrabold uppercase tracking-widest text-sm border-[3px] border-black shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer">
              <span className="flex items-center gap-2">
              <RouterLink to="/browse">  Start Questing <ArrowRight size={20} strokeWidth={3} /></RouterLink>
              </span>
            </button>

            {/* Secondary Action */}
            <button className="flex items-center gap-3 bg-white px-10 py-4 font-extrabold uppercase tracking-widest text-sm border-[3px] border-black shadow-brutal hover:bg-slate-50 transition-all cursor-pointer">
              <Play size={18} fill="black" /> Watch Trailer
            </button>
          </div>
        </div>

        {/* Right Side: "The Floating Card" */}
        <div className="relative hidden lg:block">
          {/* Background Decorative Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-codedex-purple/10 rounded-full blur-3xl -z-10"></div>
          
          {/* Hero Image / Card */}
          <div className="animate-float relative bg-white border-[4px] border-black p-8 shadow-brutal-lg rotate-3">
             <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 border-2 border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-black"></div>
                </div>
                <span className="font-black text-xs uppercase tracking-widest bg-codedex-yellow px-2 border-2 border-black">Quest #042</span>
             </div>
             
             <div className="space-y-4">
                <div className="h-4 w-3/4 bg-slate-200 border-2 border-black"></div>
                <div className="h-4 w-full bg-slate-200 border-2 border-black"></div>
                <div className="h-24 w-full bg-codedex-purple/20 border-2 border-black flex items-center justify-center">
                    <span className="font-black italic text-codedex-purple uppercase text-2xl">Assignment Hub</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <span className="font-black text-2xl">REWARD: $150</span>
                    <div className="bg-black text-white p-2 border-2 border-black">
                        <ArrowRight size={20} />
                    </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;