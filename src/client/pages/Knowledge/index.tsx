import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Eye, Clock, Bookmark, ChevronRight } from 'lucide-react';
import { MOCK_ARTICLES } from '../../utils/mockData';
import { Link } from 'react-router-dom';

const CATEGORIES = ['全部', '新手必看', '养护指南', '常见病害', '校园生活'];

export const Knowledge = () => {
  const [activeCategory, setActiveCategory] = useState('全部');

  return (
    <div className="min-h-screen bg-[#f8fafc] animate-in fade-in duration-500">
      {/* Header */}
      <div className="sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md z-40 px-6 pt-8 pb-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">养护百科</h2>
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
            <BookOpen size={16} />
          </div>
        </div>

        {/* Feature Article Card */}
        <div className="relative h-44 rounded-3xl overflow-hidden shadow-xl shadow-emerald-100 group">
          <img 
            src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=800" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            alt="Feature" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">今日推荐</span>
            <h3 className="text-lg font-bold text-white leading-tight">夏季多肉养护：<br/>如何避开“黑腐”陷阱</h3>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] transition-all relative pb-2 ${
                activeCategory === cat ? 'text-emerald-500' : 'text-slate-400'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div layoutId="article-cat-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Article List */}
      <div className="px-6 space-y-6 pt-4 pb-12">
        {MOCK_ARTICLES.map((article) => (
          <Link 
            key={article.id} 
            to={`/knowledge/${article.id}`}
            className="block group"
          >
            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-50 flex flex-col">
              <img src={article.imageUrl} className="w-full h-48 object-cover" alt={article.title} />
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-[8px] font-bold uppercase tracking-widest border border-slate-100">
                    {article.category}
                  </span>
                  <div className="flex gap-4 text-slate-300">
                    <div className="flex items-center gap-1"><Eye size={12} /> <span className="text-[10px] font-bold">{article.views}</span></div>
                    <div className="flex items-center gap-1"><Bookmark size={12} /></div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-emerald-500 transition-colors">{article.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{article.summary}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 text-[10px] font-bold">
                      {article.author.charAt(0)}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 italic">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                    <Clock size={10} />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
