import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Brand and About */}
          <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-tighter text-[#0f172a]">
              Job<span className="text-[#4a3728]">Portal</span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Connecting Nepal's elite talent with world-class opportunities. We build the bridge to your professional excellence.
            </p>
            <div className="flex space-x-5 pt-2">
              <Facebook className="w-5 h-5 text-slate-400 hover:text-[#4a3728] cursor-pointer transition-all hover:-translate-y-1" />
              <Twitter className="w-5 h-5 text-slate-400 hover:text-[#4a3728] cursor-pointer transition-all hover:-translate-y-1" />
              <Linkedin className="w-5 h-5 text-slate-400 hover:text-[#4a3728] cursor-pointer transition-all hover:-translate-y-1" />
              <Instagram className="w-5 h-5 text-slate-400 hover:text-[#4a3728] cursor-pointer transition-all hover:-translate-y-1" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="font-bold text-[#0f172a] uppercase tracking-widest text-xs mb-8">Quick Links</h2>
            <ul className="space-y-4 text-sm text-slate-500 font-semibold">
              <li className="hover:text-[#4a3728] cursor-pointer transition-colors">Browse Jobs</li>
              <li className="hover:text-[#4a3728] cursor-pointer transition-colors">Featured Companies</li>
              <li className="hover:text-[#4a3728] cursor-pointer transition-colors">Salary Insights</li>
              <li className="hover:text-[#4a3728] cursor-pointer transition-colors">Executive Search</li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h2 className="font-bold text-[#0f172a] uppercase tracking-widest text-xs mb-8">Resources</h2>
            <ul className="space-y-4 text-sm text-slate-500 font-semibold">
              <li className="hover:text-[#4a3728] cursor-pointer transition-colors">Career Blog</li>
              <li className="hover:text-[#4a3728] cursor-pointer transition-colors">Premium Resume Help</li>
              <li className="hover:text-[#4a3728] cursor-pointer transition-colors">Interview Coaching</li>
              <li className="hover:text-[#4a3728] cursor-pointer transition-colors">Employer Solutions</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h2 className="font-bold text-[#0f172a] uppercase tracking-widest text-xs mb-8">Contact</h2>
            <ul className="space-y-5 text-sm text-slate-500 font-semibold">
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-[#f5f1ee] transition-colors">
                  <Mail className="w-4 h-4 text-[#4a3728]" />
                </div>
                support@jobportal.com.np
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-[#f5f1ee] transition-colors">
                  <Phone className="w-4 h-4 text-[#4a3728]" />
                </div>
                +977 1-4400000
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-[#f5f1ee] transition-colors">
                  <MapPin className="w-4 h-4 text-[#4a3728]" />
                </div>
                Kathmandu, Nepal
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
            © 2026 JobPortal Nepal. Crafted for Excellence.
          </p>
          <div className="flex space-x-10 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <span className="hover:text-[#4a3728] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#4a3728] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#4a3728] cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;