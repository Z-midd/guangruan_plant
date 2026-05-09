import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Share2, Heart, ShieldCheck, Leaf, Droplets, Sun, Wind, X } from 'lucide-react';
import { MOCK_PLANTS } from '../../utils/mockData';

export const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApply, setShowApply] = useState(false);
  const plant = MOCK_PLANTS.find(p => p.id === id);

  if (!plant) return <div className="p-10 text-center">绿植不存在</div>;

  return (
    <div className="min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      {/* Top Banner */}
      <div className="relative h-[45vh]">
        <img src={plant.imageUrl} className="w-full h-full object-cover" alt={plant.name} />
        <div className="absolute top-8 left-6 right-6 flex justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <Heart size={18} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-8 relative z-10 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[8px] font-bold uppercase tracking-widest">{plant.category}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">库存 {plant.stock}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{plant.name}</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase italic tracking-widest">{plant.scientificName}</p>
        </div>

        {/* Stats / Care Primitives */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: '光照', value: '中等', icon: Sun, color: 'text-orange-400', bg: 'bg-orange-50' },
            { label: '水分', value: '见干见湿', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-50' },
            { label: '温度', value: '15-28℃', icon: Wind, color: 'text-purple-400', bg: 'bg-purple-50' },
            { label: '难度', value: '新手级', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-50' },
          ].map((item, i) => (
            <div key={i} className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl ${item.bg}`}>
              <item.icon size={16} className={item.color} />
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
              <span className="text-[10px] font-bold text-slate-700">{item.value}</span>
            </div>
          ))}
        </div>

        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">详细介绍</h3>
          <p className="text-xs leading-relaxed text-slate-500">{plant.description}</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">绿植功效</h3>
          <div className="flex flex-wrap gap-2">
            {plant.benefits?.map((b, i) => (
              <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-medium text-slate-600 italic"># {b}</span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">领养需知</h3>
          <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
            {[
              '需承诺定期打卡记录生长过程',
              '严禁私自转让或遗弃领养植物',
              '如遇到不可抗力因素请及时联系基地',
              '按时参与线上线下的养护培训'
            ].map((rule, i) => (
              <div key={i} className="flex gap-2 items-start text-[10px] text-slate-500 font-medium">
                <ShieldCheck size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                <p>{rule}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 flex gap-4 z-50">
        <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-slate-100 active:scale-95 transition-transform">
          查看打卡日记
        </button>
        <button 
          onClick={() => setShowApply(true)}
          className="flex-[1.5] py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-emerald-200 active:scale-95 transition-transform"
        >
          立即申请领养
        </button>
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApply && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowApply(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] z-[70] p-8 pb-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-900">填写领养申请</h2>
                <button onClick={() => setShowApply(false)} className="p-2 bg-slate-100 rounded-full"><X size={20} /></button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">申请理由 (必填)</label>
                  <textarea 
                    rows={4} 
                    placeholder="请简述您的养护计划和申请初衷..."
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-emerald-500 transition-all resize-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">联系电话</label>
                  <input 
                    type="tel" 
                    placeholder="请输入手机号码"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs outline-none focus:border-emerald-500 transition-all font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 px-1">
                  <input type="checkbox" className="w-4 h-4 rounded text-emerald-500" />
                  <span className="text-[10px] text-slate-400 font-medium">我已阅读并同意《绿植领养协议》</span>
                </div>
                <button 
                  onClick={() => {
                    alert('申请已提交，等待审核');
                    setShowApply(false);
                  }}
                  className="w-full py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-emerald-200"
                >
                  确认提交申请
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
