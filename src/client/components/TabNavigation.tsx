import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sprout, BookOpen, ShoppingBag, User } from 'lucide-react';
import { clsx } from 'clsx';

const TABS = [
  { path: '/home', icon: Home, label: '首页' },
  { path: '/plants', icon: Sprout, label: '领养' },
  { path: '/knowledge', icon: BookOpen, label: '科普' },
  { path: '/mall', icon: ShoppingBag, label: '商城' },
  { path: '/profile', icon: User, label: '我的' },
];

export const TabNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-around px-2 z-50 pb-safe">
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => 
            clsx(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isActive ? "text-emerald-500 scale-110" : "text-slate-400"
            )
          }
        >
          <tab.icon size={22} strokeWidth={2.5} />
          <span className="text-[10px] font-bold tracking-wider">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
