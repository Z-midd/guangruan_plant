import React from 'react';
import { motion } from 'motion/react';
import { Settings, ChevronRight, Package, Heart, Calendar, LogOut, Award, Clock } from 'lucide-react';
import { MOCK_USER, MOCK_RECORDS } from '../../utils/mockData';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon: Icon, label, extra, to }: { icon: any, label: string, extra?: string, to?: string }) => (
  <Link to={to || '#'} className="flex items-center justify-between py-4 group active:bg-slate-50 transition-colors px-2 rounded-xl">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all">
        <Icon size={20} />
      </div>
      <span className="text-sm font-bold text-slate-700 tracking-tight">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {extra && <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{extra}</span>}
      <ChevronRight size={16} className="text-slate-300" />
    </div>
  </Link>
);

export const Profile = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] animate-in fade-in duration-500">
      {/* Upper Profile Section */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[40px] shadow-sm border-b border-slate-100">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={MOCK_USER.avatar} className="w-16 h-16 rounded-2xl object-cover border-4 border-emerald-50" alt="Avatar" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-lg flex items-center justify-center text-white scale-75">
                <Award size={12} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{MOCK_USER.nickname}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-bold uppercase tracking-widest">Lv.3 资深领养人</span>
              </div>
            </div>
          </div>
          <button className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600">
            <Settings size={20} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: '我的积分', value: MOCK_USER.points, color: 'text-orange-500' },
            { label: '领养植物', value: '2', color: 'text-emerald-500' },
            { label: '参与活动', value: '5', color: 'text-blue-500' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className={stat.color + " text-lg font-bold"}>{stat.value}</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 mt-8 space-y-8 pb-12">
        {/* Adoption Status Summary */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">我的领养动态</h3>
            <Link to="/adoption-records" className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">查看全部</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
            {MOCK_RECORDS.map((record) => (
              <div key={record.id} className="flex-shrink-0 w-32 space-y-2">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
                  <img src={record.imageUrl} className="w-full h-full object-cover" alt={record.plantName} />
                  <div className={`absolute inset-0 bg-black/20 flex items-center justify-center`}>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-widest ${
                      record.status === 'approved' ? 'bg-emerald-500' : 'bg-orange-500'
                    }`}>
                      {record.status === 'approved' ? '养护中' : '审核中'}
                    </span>
                  </div>
                </div>
                <h4 className="text-[10px] font-bold text-slate-700 text-center uppercase tracking-wider truncate">{record.plantName}</h4>
              </div>
            ))}
            <button className="flex-shrink-0 w-32 aspect-square rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 text-slate-300 active:bg-slate-50 transition-colors">
              <Package size={20} />
              <span className="text-[8px] font-bold uppercase tracking-widest text-center">去领养<br/>新绿植</span>
            </button>
          </div>
        </div>

        {/* Menu Group */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 space-y-2">
           <MenuItem icon={Heart} label="我的愿望单" extra="4 种植物" />
           <MenuItem icon={Calendar} label="活动行程表" extra="2 个待办" />
           <MenuItem icon={Clock} label="积分兑换记录" />
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 space-y-2">
           <MenuItem icon={Package} label="生长日记库" extra="12 篇更新" />
           <button onClick={onLogout} className="w-full text-left">
            <MenuItem icon={LogOut} label="退出系统" />
           </button>
        </div>

        <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-loose pt-4">
          GZIST PLANT CLIENT EDITORIAL v1.0<br/>© 2024 DESIGN BY AI AGENT
        </p>
      </div>
    </div>
  );
};
