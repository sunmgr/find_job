import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Zap, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-codedex-cream border-t-[4px] border-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: The Studio */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <div className="bg-codedex-yellow border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Zap size={18} fill="black" />
               </div>
               <h1 className="text-3xl font-[900] tracking-tighter text-black uppercase italic">
                Study<span className="text-codedex-purple">Gig</span>
              </h1>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed font-bold uppercase tracking-tight">
              Nepal's #1 hub for student bounty hunters. Level up your skills, solve real-world quests, and build your inventory.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h2 className="font-[900] text-black uppercase italic tracking-tighter text-xl mb-8">Navigation</h2>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-600">
              <FooterLink label="Browse Quests" />
              <FooterLink label="Hall of Fame" />
              <FooterLink label="XP Insights" />
              <FooterLink label="Partner Hub" />
            </ul>
          </div>

          {/* Column 3: Loot & Resources */}
          <div>
            <h2 className="font-[900] text-black uppercase italic tracking-tighter text-xl mb-8">Resources</h2>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-600">
              <FooterLink label="Player Manual" />
              <FooterLink label="Build a Portfolio" />
              <FooterLink label="Interview Dojo" />
              <FooterLink label="Open Source" />
            </ul>
          </div>

          {/* Column 4: Comms Center */}
          <div>
            <h2 className="font-[900] text-black uppercase italic tracking-tighter text-xl mb-8">Comms Center</h2>
            <ul className="space-y-5 text-[11px] font-black uppercase tracking-widest text-slate-700">
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                  <Mail className="w-4 h-4 text-codedex-purple" strokeWidth={3} />
                </div>
                Support@StudyGig.np
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                  <Phone className="w-4 h-4 text-codedex-purple" strokeWidth={3} />
                </div>
                +977 1-Adventure
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                  <MapPin className="w-4 h-4 text-codedex-purple" strokeWidth={3} />
                </div>
                Kathmandu Nexus
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Retro Credits Style */}
        <div className="border-t-[3px] border-black mt-20 pt-10 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-black text-[11px] font-black uppercase tracking-[0.2em] italic">
            © 2026 StudyGig Nepal — Insert Coin to Continue
          </p>
          <div className="flex space-x-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <span className="hover:text-codedex-purple cursor-pointer transition-colors border-b-2 border-transparent hover:border-black">Privacy.cfg</span>
            <span className="hover:text-codedex-purple cursor-pointer transition-colors border-b-2 border-transparent hover:border-black">Terms.md</span>
            <span className="hover:text-codedex-purple cursor-pointer transition-colors border-b-2 border-transparent hover:border-black">Cookies.log</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper for Social Icons
const SocialIcon = ({ icon }) => (
  <div className="p-2 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer">
    {icon}
  </div>
);

// Helper for Footer Links
const FooterLink = ({ label }) => (
  <li className="flex items-center gap-1 hover:text-codedex-purple cursor-pointer transition-colors group">
    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    <span className="group-hover:translate-x-1 transition-transform">{label}</span>
  </li>
);

export default Footer;