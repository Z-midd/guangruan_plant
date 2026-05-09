import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ChevronRight, Bookmark } from 'lucide-react';
import { MOCK_ACTIVITIES } from '../../utils/mockData';
import { Link } from 'react-router-dom';

export const Activities = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] animate-in fade-in duration-500">
      {/* Header */}
      <div className="sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md z-40 px-6 pt-12 pb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">校园活动</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">参与活动 赢取丰厚积分</p>
        </div>
        <button className="p-2.5 bg-white shadow-sm border border-slate-100 rounded-full text-slate-400">
          <Bookmark size={20} />
        </button>
      </div>

      {/* Activity List */}
      <div className="px-6 space-y-6 pt-4 pb-12">
        {MOCK_ACTIVITIES.map((act) => (
          <Link key={act.id} to={`/activities/${act.id}`} className="block group">
            <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-50 relative">
              <div className="relative h-56">
                <img src={act.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={act.title} />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                    act.status === 'upcoming' ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                  }`}>
                    {act.status === 'upcoming' ? '招募中' : '已结束'}
                  </span>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-500 transition-colors">{act.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{act.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <Calendar size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-bold uppercase">活动日期</span>
                      <span className="text-[10px] font-bold text-slate-700">{act.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <MapPin size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-bold uppercase">活动地点</span>
                      <span className="text-[10px] font-bold text-slate-700 truncate max-w-[80px]">{act.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex -space-x-3 overflow-hidden">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="inline-block h-8 w-8 rounded-full ring-4 ring-white bg-slate-100 flex items-center justify-center text-[10px] border border-slate-50 text-slate-400 uppercase font-bold">
                        {i}
                      </div>
                    ))}
                    <div className="inline-block h-8 w-8 rounded-full ring-4 ring-white bg-emerald-50 flex items-center justify-center text-[10px] border border-emerald-100 text-emerald-600 font-bold">
                      +{act.enrolledCount}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    详情 / 报名 <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
