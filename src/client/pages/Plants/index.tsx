import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowLeft, Info, MapPin } from 'lucide-react';
import { MOCK_PLANTS } from '../../utils/mockData';
import { Link } from 'react-router-dom';

const CATEGORIES = ['全部', '室内观叶', '多肉植物', '空气净化', '网红绿植'];

export const Plants = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlants = MOCK_PLANTS.filter(plant => {
    const matchesCategory = activeCategory === '全部' || plant.category === activeCategory;
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] animate-in fade-in duration-500">
      {/* Search Header */}
      <div className="sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md z-40 px-6 pt-8 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">领养广场</h2>
          <button className="text-xs font-bold text-emerald-500 uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">规则详情</button>
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="搜索你心仪的植物..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-2xl text-xs outline-none shadow-sm focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all font-medium" 
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400">
            <Filter size={18} />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                  : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="px-6 grid grid-cols-2 gap-4 pb-8">
        <AnimatePresence mode="popLayout">
          {filteredPlants.map((plant) => (
            <motion.div
              layout
              key={plant.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                to={`/plants/${plant.id}`}
                className="block bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 active:scale-95 transition-transform"
              >
                <div className="relative aspect-[4/5]">
                  <img src={plant.imageUrl} className="w-full h-full object-cover" alt={plant.name} />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/30 backdrop-blur-md rounded-lg text-[8px] font-bold text-white uppercase tracking-widest">
                    {plant.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 text-sm">{plant.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-[8px] text-slate-400 font-bold uppercase">
                    <MapPin size={8} /> GZIST 校园基地
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-bold uppercase">当前库存</span>
                      <span className="text-xs font-bold text-emerald-500">{plant.stock} 盆</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <ArrowLeft className="rotate-180" size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
