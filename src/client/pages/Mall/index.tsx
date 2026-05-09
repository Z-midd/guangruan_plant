import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Info, ChevronRight, Zap } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_USER } from '../../utils/mockData';
import { Link } from 'react-router-dom';

export const Mall = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] animate-in fade-in duration-500">
      {/* Header */}
      <div className="sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md z-40 px-6 pt-12 pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">积分商城</h2>
          <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-2xl shadow-lg shadow-slate-200">
            <Zap size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{MOCK_USER.points} 积分</span>
          </div>
        </div>

        {/* Banner */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
          <div className="relative z-10 space-y-2">
            <span className="px-2 py-0.5 bg-white/20 rounded text-[8px] font-bold uppercase tracking-widest">限时活动</span>
            <h3 className="text-lg font-bold">积分翻倍周</h3>
            <p className="text-[10px] text-white/70 max-w-[180px] leading-relaxed uppercase tracking-wider">本周参与“绿植打卡”活动，积分获取速度提升 100%</p>
          </div>
          <ShoppingBag size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-6 space-y-8 pb-12 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">养护精选</h3>
          <Link to="/orders" className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
            兑换记录 <ChevronRight size={10} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50 flex flex-col"
            >
              <div className="relative aspect-square">
                <img src={product.imageUrl} className="w-full h-full object-cover" alt={product.name} />
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-400">
                  <Star size={14} />
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{product.name}</h4>
                <p className="text-[8px] text-slate-400 mt-1 uppercase tracking-wider">库存 {product.stock}</p>
                <div className="mt-auto pt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-1">
                    <Zap size={10} className="text-yellow-500" />
                    <span className="text-sm font-bold text-indigo-600 tracking-tight">{product.price}</span>
                    <span className="text-[8px] font-bold text-slate-300 uppercase">积分</span>
                  </div>
                  <button className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[8px] font-bold uppercase tracking-widest transition-colors hover:bg-indigo-100">
                    立即兑换
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
