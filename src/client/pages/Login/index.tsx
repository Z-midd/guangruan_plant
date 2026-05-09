import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified logic for prototype
    onLogin();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-8 pt-20 pb-12 animate-in fade-in duration-700">
      <div className="space-y-2 mb-12">
        <div className="w-16 h-16 bg-emerald-500 rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-emerald-100 mb-6">
          <Sprout size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">欢迎回来</h1>
        <p className="text-sm font-medium text-slate-400">登入广软绿植，开启绿色生活。</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="学号 / 邮箱" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium outline-none focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="password" 
              placeholder="密码" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium outline-none focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <button className="text-xs font-bold text-slate-400 uppercase tracking-widest text-right block w-full">忘记密码?</button>

        <button 
          type="submit"
          className="w-full py-4 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-2 group hover:bg-slate-800 transition-all shadow-xl shadow-slate-100"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">安全登录帐号</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-12 space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest"><span className="bg-white px-4 text-slate-300">其他登录方式</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-4 bg-slate-50 rounded-2xl border border-slate-100 group active:scale-95 transition-all">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Github size={14} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">GitHub</span>
          </button>
          <button className="flex items-center justify-center gap-3 py-4 bg-slate-50 rounded-2xl border border-slate-100 group active:scale-95 transition-all">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <img src="https://www.google.com/favicon.ico" className="w-3 h-3" alt="Google" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Google</span>
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 font-medium pt-8">
          还没有帐号? <button className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] ml-1">立即注册</button>
        </p>
      </div>
    </div>
  );
};
