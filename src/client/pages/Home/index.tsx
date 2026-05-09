import React from 'react';
import { motion } from 'motion/react';
import { Search, Bell, Flame, ArrowRight, Star } from 'lucide-react';
import { MOCK_PLANTS, MOCK_ARTICLES, MOCK_ACTIVITIES } from '../../utils/mockData';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md z-40 px-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">发现绿色</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">广州软件学院绿植领养</p>
        </div>
        <div className="flex gap-4">
          <button className="p-2 bg-white rounded-full shadow-sm border border-slate-100"><Search size={18} /></button>
          <button className="p-2 bg-white rounded-full shadow-sm border border-slate-100 relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Hero Carousel (Simplified as one big card for prototype) */}
      <section className="px-6">
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="relative h-48 rounded-3xl overflow-hidden shadow-xl shadow-emerald-200/50"
        >
          <img 
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2000" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">年度盛典</span>
            <h2 className="text-xl font-bold text-white">毕业季绿植领养专题</h2>
            <p className="text-xs text-white/70 mt-1">带走一份回忆，留下满园生机。</p>
          </div>
        </motion.div>
      </section>

      {/* Categories / Quick Actions */}
      <section className="px-6 grid grid-cols-4 gap-4">
        {[
          { label: '多肉', icon: '🌵', color: 'bg-orange-50' },
          { label: '观叶', icon: '🌿', color: 'bg-emerald-50' },
          { label: '净化', icon: '💨', color: 'bg-blue-50' },
          { label: '花卉', icon: '🌸', color: 'bg-pink-50' },
        ].map((cat, i) => (
          <button key={i} className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-white/50`}>
              {cat.icon}
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{cat.label}</span>
          </button>
        ))}
      </section>

      {/* Recommended Plants */}
      <section className="space-y-4">
        <div className="px-6 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
             <Flame size={18} className="text-orange-500" />
             热门推荐
          </h3>
          <Link to="/plants" className="text-xs text-emerald-500 font-bold flex items-center gap-1">
            查看更多 <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 pb-4 no-scrollbar">
          {MOCK_PLANTS.map((plant) => (
            <motion.div 
              key={plant.id}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-44 bg-white rounded-2xl p-3 shadow-md shadow-slate-100 border border-slate-50"
            >
              <img src={plant.imageUrl} className="w-full aspect-square object-cover rounded-xl mb-3" alt={plant.name} />
              <h4 className="font-bold text-slate-800 text-sm truncate">{plant.name}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{plant.category}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-500">库存 {plant.stock}</span>
                <button className="w-6 h-6 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                  <Star size={12} fill="currentColor" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hot Activities */}
      <section className="px-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">精彩活动</h3>
          <Link to="/activities" className="text-xs text-slate-400 font-medium">全部</Link>
        </div>
        <div className="space-y-4">
          {MOCK_ACTIVITIES.map((act) => (
            <Link key={act.id} to={`/activities/${act.id}`} className="block relative h-28 rounded-2xl overflow-hidden group">
              <img src={act.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={act.title} />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-4">
                <h4 className="font-bold text-white text-sm">{act.title}</h4>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-white/80">
                  <span>{act.date}</span>
                  <span>|</span>
                  <span>{act.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Maintenance Guide */}
      <section className="px-6 pb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">养护百科</h3>
          <Link to="/knowledge" className="text-xs text-slate-400 font-medium">去学习</Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {MOCK_ARTICLES.slice(0, 2).map((article) => (
            <Link key={article.id} to={`/knowledge/${article.id}`} className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-50">
              <img src={article.imageUrl} className="w-20 h-20 rounded-xl object-cover shrink-0" alt={article.title} />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{article.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{article.summary}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                  <span>{article.author}</span>
                  <span>{article.views} 阅读</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
