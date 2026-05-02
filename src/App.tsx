/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rss, 
  Globe, 
  Hash, 
  Music, 
  ExternalLink, 
  Terminal, 
  Loader2, 
  Drum, 
  Twitter, 
  Instagram, 
  Youtube,
  Search
} from 'lucide-react';
import axios from 'axios';

interface FeedItem {
  title: string;
  link: string;
  date?: string;
  summary?: string;
  source: string;
  author?: string;
}

interface SocialHandle {
  platform: string;
  handle: string;
  link: string;
  lastPost: string;
}

interface FeedData {
  pantrinbago_feed: FeedItem[];
  global_pannist_feeds: FeedItem[];
  social_handles: SocialHandle[];
  color_theme: {
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
  };
}

export default function App() {
  const [data, setData] = useState<FeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewJson, setViewJson] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/feeds');
        setData(response.data);
      } catch (err) {
        setError('Failed to sync feeds. Check connection to the Audio Alchemy network.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-[#E94560]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6 bg-[#1A1A2E] text-slate-100 max-w-[1440px] mx-auto">
      {/* Header Section */}
      <header className="flex justify-between items-end border-b-2 border-[#E94560] pb-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-[#E94560] uppercase flex items-baseline gap-2">
            Steelpan <span className="text-white font-light lowercase">Alchemy</span>
          </h1>
          <p className="text-[#0F3460] font-mono text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Search className="w-3 h-3" /> Global Feed Aggregator // Caribbean Core
          </p>
        </div>
        <div className="flex gap-4">
          <div className="system-card">
            <span className="text-[#E94560] block">STATUS</span>
            <span className="font-mono text-white">SYSTEMS NOMINAL</span>
          </div>
          <div className="system-card">
            <span className="text-[#E94560] block">ACTIVE FEEDS</span>
            <span className="font-mono text-white">142 GLOBAL SOURCES</span>
          </div>
          <button 
            onClick={() => setViewJson(!viewJson)}
            className="system-card border-[#E94560]/30 hover:bg-accent/10 transition-colors"
          >
            <span className="text-[#E94560] block">ROOT_DATA</span>
            <span className="font-mono text-white">VIEW_JSON</span>
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="grid grid-cols-12 gap-6 flex-grow min-h-0">
        
        {/* Column 1: Pan Trinbago Official */}
        <section className="col-span-4 flex flex-col bg-[#16213E] p-4 border border-[#0F3460]/50 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-[#E94560] rounded-full animate-pulse"></div>
            <h2 className="text-lg font-bold tracking-tight uppercase">Trinbago Pulse</h2>
          </div>
          
          <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            {data?.pantrinbago_feed.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-l-2 border-[#E94560] pl-4 py-1"
              >
                <span className="text-[10px] text-[#0F3460] font-mono block mb-1 uppercase">RSS // {item.date ? new Date(item.date).getHours() : '0'}H AGO</span>
                <h3 className="text-sm font-semibold leading-tight hover:text-accent transition-colors underline decoration-highlight/50 cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 italic">
                  "{item.summary || 'Fetching encrypted content summary...'}"
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-auto pt-4 text-[10px] text-[#0F3460] font-mono flex justify-between items-center bg-[#16213E] border-t border-[#0F3460]">
            <span>SOURCE: PANTRINBAGO.CO.TT</span>
            <Globe className="w-3 h-3" />
          </div>
        </section>

        {/* Column 2: Global Spotlight & Feeds */}
        <section className="col-span-5 flex flex-col gap-6 overflow-hidden">
          <h2 className="text-xs font-mono text-[#E94560] uppercase tracking-[0.2em]">Featured Alchemy Sessions</h2>
          
          {/* Featured Card */}
          <div className="relative bg-[#0F3460] p-6 rounded-sm border border-[#E94560]/30 overflow-hidden shrink-0">
            <div className="relative z-10">
              <span className="bg-[#E94560] text-white text-[10px] px-2 py-0.5 font-bold uppercase mb-4 inline-block italic tracking-widest">Global Drop</span>
              <h3 className="text-3xl font-bold leading-none mb-4 tracking-tighter">
                The Collective:<br/>Resonance & Iron
              </h3>
              <p className="text-sm text-slate-300 max-w-[280px] mb-6">
                Technical breakdown of jazz-fusion integration in modern panyard structures.
              </p>
              <div className="flex gap-4">
                <button className="border border-[#E94560] text-[#E94560] text-[10px] px-4 py-2 font-bold uppercase hover:bg-[#E94560] hover:text-white transition-all">
                  Sync Stream
                </button>
                <button className="bg-white/5 text-white text-[10px] px-4 py-2 font-bold uppercase border border-white/10">
                  Metadata
                </button>
              </div>
            </div>
            {/* Decorative background circle */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 border-[24px] border-[#16213E] rounded-full opacity-30"></div>
          </div>

          {/* Global Small Feeds */}
          <div className="grid grid-cols-2 gap-4 overflow-y-auto">
            {data?.global_pannist_feeds.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#16213E] p-4 border border-[#0F3460] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-[#E94560] font-mono">{item.author || '@GlobalPan'}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-xs leading-tight font-medium text-slate-200">
                    {item.title}
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-4 text-[9px] font-mono text-slate-500">
                  <Music className="w-3 h-3" /> ALCHEMY_ID: {idx + 100}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Column 3: Social Pulse */}
        <section className="col-span-3 flex flex-col bg-[#16213E] p-4 border border-[#0F3460] relative">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-[#0F3460] pb-2 flex items-center justify-between">
            Social Pulse <Hash className="w-3 h-3 text-[#E94560]" />
          </h2>
          
          <div className="flex flex-col gap-6">
            {data?.social_handles.map((social, idx) => (
              <div key={idx} className="flex gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-[#0F3460] flex items-center justify-center font-bold text-[#E94560] shrink-0 border border-transparent group-hover:border-accent transition-colors">
                  {social.platform === 'Twitter/X' && <Twitter className="w-5 h-5" />}
                  {social.platform === 'Instagram' && <Instagram className="w-5 h-5" />}
                  {social.platform === 'YouTube' && <Youtube className="w-5 h-5" />}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-white uppercase tracking-tight">{social.platform} // {social.handle}</p>
                  <p className="text-[10px] text-slate-500 truncate italic">"{social.lastPost}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Audio Alchemy Player Mock */}
          <div className="mt-auto">
            <div className="bg-[#0F3460] p-4 rounded-sm border border-accent/20">
              <p className="text-[10px] font-mono text-[#E94560] mb-3 uppercase flex items-center gap-2">
                <Music className="w-3 h-3" /> Audio Alchemy Mix
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-grow h-1 bg-[#1A1A2E] relative overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "42%" }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute left-0 top-0 h-full bg-[#E94560]"
                  />
                </div>
                <span className="text-[10px] font-mono text-white/50">03:41</span>
              </div>
              <p className="text-[10px] mt-3 font-bold truncate text-white uppercase tracking-tighter">
                Desert Island Pan - Liam Teague
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Bar */}
      <footer className="flex justify-between items-center text-[10px] text-[#0F3460] font-mono border-t border-[#0F3460] pt-4">
        <div>ENCODING: UTF-8 // FILTER: "STEELPAN", "PANNIST", "CARIBBEAN"</div>
        <div className="flex gap-6 uppercase">
          <span className="text-[#E94560] flex items-center gap-1">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Live Updates Enabled
          </span>
          <span>Alchemy Engine v4.2</span>
          <span>&copy; {new Date().getFullYear()} Pan Alchemy Hub</span>
        </div>
      </footer>

      {/* JSON Modal */}
      <AnimatePresence>
        {viewJson && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1A1A2E]/98 p-8 backdrop-blur-sm"
          >
            <div className="max-w-4xl mx-auto h-full flex flex-col">
              <div className="flex justify-between items-center mb-6 border-b border-highlight pb-4">
                <h2 className="text-xl font-mono text-accent">RAW_FEED_INTERCEPT</h2>
                <button onClick={() => setViewJson(false)} className="system-card border-accent bg-accent text-white">TERMINATE_VIEW</button>
              </div>
              <pre className="flex-grow bg-[#16213E] p-8 rounded border border-highlight font-mono text-xs text-slate-400 overflow-auto border-dashed">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
