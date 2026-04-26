/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  BookOpen, 
  FileCheck, 
  Calendar, 
  Camera, 
  Users, 
  ShoppingBag, 
  LogOut, 
  Bell, 
  Search, 
  Plus, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  ArrowUpRight,
  TrendingUp,
  UserCircle,
  Menu,
  ChevronRight,
  Upload,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

type Page = 
  | 'dashboard' 
  | 'plant-list' 
  | 'plant-form' 
  | 'knowledge-list' 
  | 'knowledge-form' 
  | 'adoption-review' 
  | 'activity' 
  | 'growth-diary' 
  | 'user-management' 
  | 'points-management';

// --- Mock Data ---

const MOCK_STATS = [
  { label: '领养总数', value: '1,284', icon: Sprout, color: 'text-primary-dark', bg: 'bg-primary-light' },
  { label: '用户总数', value: '3,502', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '待审核数量', value: '12', icon: FileCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: '活动总数', value: '48', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const CHART_DATA = [
  { name: '周一', count: 40 },
  { name: '周二', count: 30 },
  { name: '周三', count: 65 },
  { name: '周四', count: 45 },
  { name: '周五', count: 90 },
  { name: '周六', count: 120 },
  { name: '周日', count: 85 },
];

const PLANT_DATA = [
  { id: 1, name: '绿萝', category: '室内观叶', stock: 50, status: '上架', condition: '勤浇水' },
  { id: 2, name: '多肉-桃蛋', category: '多肉植物', stock: 20, status: '上架', condition: '见干见湿' },
  { id: 3, name: '吊兰', category: '空气净化', stock: 35, status: '下架', condition: '普通养护' },
  { id: 4, name: '虎皮兰', category: '空气净化', stock: 15, status: '上架', condition: '耐旱' },
  { id: 5, name: '发财树', category: '室内大型', stock: 8, status: '上架', condition: '忌积水' },
];

const ADOPTION_DATA = [
  { id: 'AD001', applicant: '陈同学', plant: '绿萝', date: '2024-05-20', status: '待审核', reason: '宿舍绿化' },
  { id: 'AD002', applicant: '李同学', plant: '虎皮兰', date: '2024-05-19', status: '已通过', reason: '热爱园艺' },
  { id: 'AD003', applicant: '张同学', plant: '多肉', date: '2024-05-18', status: '已驳回', reason: '无养护经验' },
];

const USER_DATA = [
  { id: 1, name: '张三', role: '学生', points: 120, status: '正常', email: 'zhang@gzist.edu.cn' },
  { id: 2, name: '李四', role: '志愿者', points: 450, status: '正常', email: 'li@gzist.edu.cn' },
  { id: 3, name: '王五', role: '学生', points: 50, status: '禁用', email: 'wang@gzist.edu.cn' },
];

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-6 py-2.5 text-xs font-medium transition-all transition-colors border-r-4",
      active 
        ? "bg-primary-light text-primary-dark border-primary" 
        : "text-slate-500 hover:bg-primary-faint border-transparent hover:text-primary"
    )}
  >
    <Icon size={16} className={active ? "text-primary-dark" : "text-slate-400"} />
    <span>{label}</span>
  </button>
);

const Badge = ({ children, type = 'default' }: { children: React.ReactNode, type?: 'success' | 'warning' | 'error' | 'default' }) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    error: "bg-rose-50 text-rose-600 border-rose-100",
    default: "bg-slate-50 text-slate-500 border-slate-100",
  };
  return (
    <span className={cn("px-2 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-full", styles[type])}>
      {children}
    </span>
  );
};

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className,
  icon: Icon
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost',
  onClick?: () => void,
  className?: string,
  icon?: any
}) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
    secondary: "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200",
    danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-sm",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-50",
  };
  
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all active:scale-[0.98] disabled:opacity-50",
        variants[variant],
        className
      )}
    >
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
};

const Card = ({ children, className, title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <div className={cn("bg-white rounded-2xl border border-border shadow-sm overflow-hidden", className)}>
    {title && (
      <div className="px-6 py-4 border-b border-border font-bold text-xs uppercase tracking-widest text-slate-700 bg-border-light">
        {title}
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

// --- Layout Components ---

const Header = ({ title }: { title: string }) => (
  <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
    <div className="flex items-center gap-2">
      <h1 className="text-sm font-medium text-slate-500">
        广州软件学院绿植领养与养护管理系统 / <span className="text-primary font-bold">{title}</span>
      </h1>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <span>{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</span>
      </div>
      <div className="h-4 w-[1px] bg-border hidden md:block"></div>
      <div className="relative group">
        <button className="p-2 text-slate-400 hover:text-primary transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
      <div className="h-8 w-[1px] bg-border"></div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-slate-700">管理员_张三</p>
          <p className="text-[10px] text-slate-400 uppercase">系统超级管理员</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary-light border border-primary/20 flex items-center justify-center text-primary-dark font-bold text-xs">
          管
        </div>
      </div>
    </div>
  </header>
);

// --- Pages ---

const LoginPage = ({ onLogin }: { onLogin: () => void }) => (
  <div 
    className="min-h-screen w-full flex items-center justify-center bg-background"
    style={{ backgroundImage: 'linear-gradient(rgba(244, 249, 246, 0.8), rgba(244, 249, 246, 0.8)), url("https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=2000")' }}
  >
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm p-10 bg-white rounded-3xl shadow-xl border border-border m-4"
    >
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-md shadow-primary/20">
          <Sprout size={28} />
        </div>
        <h1 className="text-xl font-bold text-slate-800 uppercase tracking-widest">广州软件学院</h1>
        <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">绿植领养与养护管理系统</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">账号</label>
          <input 
            type="text" 
            placeholder="ADMIN USERNAME"
            className="w-full px-4 py-3 text-xs bg-slate-50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            defaultValue="admin"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">密码</label>
          <input 
            type="password" 
            placeholder="PASSWORD"
            className="w-full px-4 py-3 text-xs bg-slate-50 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            defaultValue="123456"
          />
        </div>
        <button 
          onClick={onLogin}
          className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          安全登录系统
        </button>
      </div>

      <div className="mt-12 pt-8 border-t border-border text-center">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-loose">
          © 2024 GZIST PLANT ADOPTION<br/>EDITORIAL DESIGN SYSTEM V1.0
        </p>
      </div>
    </motion.div>
  </div>
);

const Dashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {MOCK_STATS.map((stat, idx) => (
        <Card key={idx} className="hover:border-primary/20 transition-all group">
          <div className="flex flex-col gap-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
            <div className={cn("text-3xl font-light mt-1", stat.color)}>{stat.value}</div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[10px] text-primary font-bold uppercase tracking-wider">
            <TrendingUp size={10} />
            <span>↑ 12% 较上月</span>
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card title="领养趋势统计" className="lg:col-span-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="热门绿植排行">
        <div className="space-y-4">
          {[
            { name: '绿萝', value: 85, color: 'bg-emerald-500' },
            { name: '虎皮兰', value: 62, color: 'bg-blue-500' },
            { name: '多肉-桃蛋', value: 45, color: 'bg-amber-500' },
            { name: '薄荷', value: 38, color: 'bg-indigo-500' },
            { name: '吊兰', value: 24, color: 'bg-rose-500' },
          ].map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">{item.name}</span>
                <span className="font-medium text-slate-800">{item.value}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={cn("h-full transition-all duration-1000", item.color)} style={{ width: `${item.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    <Card title="最新待审核任务">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-border-light text-[11px] text-slate-400 font-bold uppercase tracking-widest border-b border-border">
            <tr>
              <th className="px-4 py-3">任务ID</th>
              <th className="px-4 py-3">类型</th>
              <th className="px-4 py-3">发起人</th>
              <th className="px-4 py-3">时间</th>
              <th className="px-4 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs">
            {ADOPTION_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 font-medium text-slate-800">#{item.id}</td>
                <td className="px-4 py-4">
                  <Badge type="default">领养申请</Badge>
                </td>
                <td className="px-4 py-4 text-slate-600">{item.applicant}</td>
                <td className="px-4 py-4 text-slate-500">{item.date}</td>
                <td className="px-4 py-4 text-right">
                  <button className="text-emerald-600 hover:underline font-medium">处理</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const PlantList = ({ onAdd }: { onAdd: () => void }) => (
  <div className="space-y-6">
    <Card className="p-0 overflow-visible">
      <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索绿植名称..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
          </div>
          <Button variant="secondary" icon={Filter}>筛选</Button>
        </div>
        <Button onClick={onAdd} icon={Plus}>新增绿植</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-border-light text-[11px] text-slate-400 font-bold uppercase tracking-widest border-b border-border">
            <tr>
              <th className="px-6 py-4">图片</th>
              <th className="px-6 py-4">绿植名称</th>
              <th className="px-6 py-4">分类</th>
              <th className="px-6 py-4">库存</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {PLANT_DATA.map((plant) => (
              <tr key={plant.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-emerald-500">
                    <Sprout size={24} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-800">{plant.name}</p>
                  <p className="text-xs text-slate-400">{plant.condition}</p>
                </td>
                <td className="px-6 py-4 text-slate-600">{plant.category}</td>
                <td className="px-6 py-4">
                  <span className={cn(plant.stock < 10 ? "text-rose-500 font-bold" : "text-slate-800")}>
                    {plant.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge type={plant.status === '上架' ? 'success' : 'default'}>{plant.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-slate-400">
                    <button className="p-1.5 hover:bg-slate-100 hover:text-emerald-600 rounded transition-colors" title="编辑">
                      <Edit size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-slate-100 hover:text-rose-600 rounded transition-colors" title="删除">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-slate-100 hover:text-slate-800 rounded transition-colors" title="上下架">
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
        <span>显示第 1 至 {PLANT_DATA.length} 个绿植，共 {PLANT_DATA.length} 个</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 bg-white border border-slate-200 rounded text-slate-400 cursor-not-allowed">上一页</button>
          <button className="px-3 py-1 bg-emerald-500 text-white rounded font-medium">1</button>
          <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">2</button>
          <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">下一页</button>
        </div>
      </div>
    </Card>
  </div>
);

const PlantForm = ({ onBack }: { onBack: () => void }) => (
  <div className="max-w-4xl mx-auto space-y-6">
    <div className="flex items-center justify-between">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors">
        <ArrowLeft size={20} />
        <span className="font-medium">返回列表</span>
      </button>
      <h2 className="text-lg font-semibold text-slate-800">新增领养绿植</h2>
      <div className="w-20"></div>
    </div>

    <Card className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">绿植名称 <span className="text-rose-500">*</span></label>
            <input type="text" placeholder="例如：绿萝" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">所属分类 <span className="text-rose-500">*</span></label>
            <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white">
              <option>请选择分类</option>
              <option>室内观叶</option>
              <option>多肉植物</option>
              <option>空气净化</option>
              <option>花卉盆栽</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">库存数量</label>
              <input type="number" defaultValue={0} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">状态</label>
              <div className="flex h-[42px] items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" defaultChecked className="text-emerald-500" />
                  <span className="text-sm">立即上架</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" className="text-emerald-500" />
                  <span className="text-sm">暂存仓库</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">绿植封面图</label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-slate-400 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer">
            <Upload size={32} />
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">点击或将图片拖拽至此处</p>
              <p className="text-xs">支持 JPG, PNG, GIF (最大 2MB)</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">领养条件</label>
        <textarea rows={2} placeholder="请输入具体的领养门槛，例如：需有半年以上室内绿植养护经验..." className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">绿植详细介绍</label>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
            <div className="h-6 w-6 bg-white rounded border border-slate-200"></div>
            <div className="h-6 w-6 bg-white rounded border border-slate-200"></div>
            <div className="h-6 w-6 bg-white rounded border border-slate-200 flex-1"></div>
          </div>
          <textarea rows={6} className="w-full px-4 py-3 outline-none transition-all resize-none"></textarea>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
        <Button variant="secondary" onClick={onBack}>取消</Button>
        <Button onClick={onBack}>提交保存</Button>
      </div>
    </Card>
  </div>
);

const KnowledgeList = ({ onAdd }: { onAdd: () => void }) => (
  <div className="space-y-6">
    <Card className="p-0 overflow-visible">
      <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="搜索知识标题..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm" />
          </div>
          <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm">
            <option>全部分类</option>
            <option>养护指南</option>
            <option>常见病害</option>
            <option>新手必看</option>
          </select>
        </div>
        <Button onClick={onAdd} icon={Plus}>发布知识</Button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: '绿萝黄叶了怎么办？常见原因分析', category: '养护指南', views: 1240, status: '发布中', date: '2024-05-20' },
            { title: '多肉配土秘籍：让你的多肉一年长满盆', category: '新手必看', views: 856, status: '草稿', date: '2024-05-18' },
            { title: '校园夏季绿植防暑降温指南', category: '养护指南', views: 2311, status: '发布中', date: '2024-05-15' },
            { title: '如何通过叶片判断植株是否缺水', category: '常见病害', views: 567, status: '发布中', date: '2024-05-12' },
          ].map((article, i) => (
            <div key={i} className="group border border-slate-100 rounded-xl p-4 hover:shadow-lg hover:border-emerald-100 transition-all bg-slate-50/30">
              <div className="aspect-video bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-300">
                <BookOpen size={48} />
              </div>
              <div className="flex justify-between items-start mb-2">
                <Badge type={article.status === '发布中' ? 'success' : 'default'}>{article.status}</Badge>
                <span className="text-xs text-slate-400">{article.date}</span>
              </div>
              <h3 className="font-semibold text-slate-800 line-clamp-2 mb-3 group-hover:text-emerald-600 transition-colors">{article.title}</h3>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex gap-4">
                  <span>{article.category}</span>
                  <span className="flex items-center gap-1"><Eye size={12} /> {article.views}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 hover:text-emerald-600"><Edit size={14} /></button>
                  <button className="p-1 hover:text-rose-600"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

const KnowledgeForm = ({ onBack }: { onBack: () => void }) => (
  <div className="max-w-4xl mx-auto space-y-6">
    <div className="flex items-center justify-between">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors">
        <ArrowLeft size={20} />
        <span className="font-medium">返回列表</span>
      </button>
      <h2 className="text-lg font-semibold text-slate-800">发布养护知识</h2>
      <div className="w-20"></div>
    </div>

    <Card className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">文章标题 <span className="text-rose-500">*</span></label>
          <input type="text" placeholder="输入吸引人的标题..." className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">所属分类</label>
            <select className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white">
              <option>养护指南</option>
              <option>常见病害</option>
              <option>新手必看</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">点击量 (初始值)</label>
            <input type="number" defaultValue={0} className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">封面图片</label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer">
            <Upload size={24} />
            <p className="text-xs">支持比例 16:9，JPG/PNG</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">文章正文</label>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-4">
              <div className="flex gap-1"><span className="w-6 h-6 bg-white border border-slate-200 rounded"></span><span className="w-6 h-6 bg-white border border-slate-200 rounded"></span></div>
              <div className="flex gap-1"><span className="w-6 h-6 bg-white border border-slate-200 rounded"></span><span className="w-6 h-6 bg-white border border-slate-200 rounded"></span><span className="w-6 h-6 bg-white border border-slate-200 rounded"></span></div>
              <div className="flex-1"></div>
            </div>
            <textarea rows={12} className="w-full px-4 py-3 outline-none resize-none" placeholder="在此编辑文章内容..."></textarea>
          </div>
        </div>
      </div>
      <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
        <Button variant="secondary" onClick={onBack}>保存草稿</Button>
        <Button onClick={onBack}>立即发布</Button>
      </div>
    </Card>
  </div>
);

const AdoptionReview = () => (
  <div className="space-y-6">
    <Card className="p-0 overflow-visible">
      <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="h-10 px-4 bg-emerald-50 text-emerald-600 rounded-lg flex items-center gap-2 border border-emerald-100 text-sm font-medium">
            <FileCheck size={18} />
            <span>待处理 (12)</span>
          </div>
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
            {['全部', '待审核', '已通过', '已驳回'].map((tab, i) => (
              <button key={tab} className={cn("px-4 py-1.5 text-xs font-medium rounded-md transition-all", i === 1 ? "bg-white shadow-sm text-emerald-600" : "text-slate-500 hover:text-slate-700")}>{tab}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-border-light text-[11px] text-slate-400 font-bold uppercase tracking-widest border-b border-border">
            <tr>
              <th className="px-6 py-4">申请单号</th>
              <th className="px-6 py-4">申请绿植</th>
              <th className="px-6 py-4">申请人</th>
              <th className="px-6 py-4">申请理由</th>
              <th className="px-6 py-4">申请日期</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {ADOPTION_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">#{item.id}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center text-emerald-500"><Sprout size={16} /></div>
                  {item.plant}
                </td>
                <td className="px-6 py-4 text-slate-600">{item.applicant}</td>
                <td className="px-6 py-4">
                  <p className="max-w-[200px] truncate text-slate-500" title={item.reason}>{item.reason}</p>
                </td>
                <td className="px-6 py-4 text-slate-500">{item.date}</td>
                <td className="px-6 py-4">
                  <Badge type={item.status === '已通过' ? 'success' : item.status === '待审核' ? 'warning' : 'error'}>
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  {item.status === '待审核' ? (
                    <div className="flex justify-end gap-2">
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium p-1 hover:bg-emerald-50 rounded">通过</button>
                      <button className="text-rose-600 hover:text-rose-700 font-medium p-1 hover:bg-rose-50 rounded">驳回</button>
                      <button className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded">详情</button>
                    </div>
                  ) : (
                    <button className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded">详情</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const UserManagement = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none">
        <p className="text-emerald-100 text-sm">活跃用户 (本月)</p>
        <p className="text-3xl font-bold mt-1">2,845</p>
        <div className="mt-4 flex items-center gap-1 text-xs text-emerald-200">
          <ArrowUpRight size={12} />
          <span>较上月提升 8.5%</span>
        </div>
      </Card>
      <Card>
        <p className="text-slate-500 text-sm">志愿者激励积分总额</p>
        <p className="text-3xl font-bold mt-1 text-slate-800">42,500</p>
        <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <span>待发放奖励：1,200 积分</span>
        </div>
      </Card>
      <Card>
        <p className="text-slate-500 text-sm">昨日注册人数</p>
        <p className="text-3xl font-bold mt-1 text-slate-800">24</p>
        <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <span>注册率稳定</span>
        </div>
      </Card>
    </div>

    <Card className="p-0 overflow-visible">
      <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="搜索用户姓名/学号..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm" />
          </div>
          <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm">
            <option>全部角色</option>
            <option>学生</option>
            <option>志愿者</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-border-light text-[11px] text-slate-400 font-bold uppercase tracking-widest border-b border-border">
            <tr>
              <th className="px-6 py-4">用户</th>
              <th className="px-6 py-4">角色</th>
              <th className="px-6 py-4">领养数</th>
              <th className="px-6 py-4">激励积分</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {USER_DATA.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium",
                    user.role === '志愿者' ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  )}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{Math.floor(Math.random() * 5)} 盆</td>
                <td className="px-6 py-4 font-medium text-emerald-600">{user.points}</td>
                <td className="px-6 py-4">
                  <Badge type={user.status === '正常' ? 'success' : 'error'}>{user.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="text-emerald-600 hover:underline">编辑</button>
                    <button className={user.status === '正常' ? "text-rose-600 hover:underline" : "text-emerald-600 hover:underline"}>
                      {user.status === '正常' ? '禁用' : '启用'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const ActivityManagement = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-bold text-slate-800">活动策划列表</h3>
      <Button icon={Plus}>发布新活动</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[
        { title: '校园绿植义诊：解决你的烦心事', date: '2024-06-10', enrollment: 45, status: '报名中', img: 'activity1' },
        { title: '毕业季绿植领养专场', date: '2024-06-15', enrollment: 120, status: '即将开始', img: 'activity2' },
        { title: '广州软件学院第一届草木节', date: '2024-05-12', enrollment: 300, status: '已结束', img: 'activity3' },
      ].map((act, i) => (
        <Card key={i} className="p-0">
          <div className="aspect-video bg-emerald-50 flex items-center justify-center text-emerald-200">
            <Calendar size={48} />
          </div>
          <div className="p-5">
            <div className="flex justify-between items-center mb-2">
              <Badge type={act.status === '报名中' ? 'success' : act.status === '已结束' ? 'default' : 'warning'}>{act.status}</Badge>
              <span className="text-xs text-slate-400">{act.date}</span>
            </div>
            <h4 className="font-bold text-slate-800 mb-4 line-clamp-1">{act.title}</h4>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                已报名 <span className="text-emerald-600 font-bold">{act.enrollment}</span> 人
              </div>
              <div className="flex gap-2">
                <button className="text-slate-400 hover:text-emerald-500"><Edit size={16} /></button>
                <button className="text-slate-400 hover:text-rose-500"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const GrowthDiaryReview = () => (
  <div className="space-y-6">
    <Card className="p-0 overflow-visible">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">生长日记审核队列</h3>
        <span className="text-sm text-slate-500">当前待审核：<span className="text-emerald-600 font-bold">8</span> 篇</span>
      </div>
      <div className="p-6 grid grid-cols-1 gap-4">
        {[
          { student: '张同学', plant: '多肉-桃蛋', content: '今天阳光很好，我的桃蛋看起来更粉了，浇了一点点水，希望它快快长大。', date: '2024-05-21 14:20' },
          { student: '赵同学', plant: '绿萝', content: '由于最近下雨，宿舍比较潮湿，感觉绿萝长得特别快，我已经准备给它换个大盆了。', date: '2024-05-21 10:05' },
        ].map((diary, i) => (
          <div key={i} className="flex gap-6 p-4 rounded-xl border border-slate-100 hover:border-emerald-100 transition-colors bg-slate-50/50">
            <div className="w-24 h-24 bg-slate-200 rounded-lg shrink-0 flex items-center justify-center text-slate-400">
              <Camera size={24} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{diary.student}</span>
                  <span className="text-xs text-slate-400">@ 观察绿植：{diary.plant}</span>
                </div>
                <span className="text-xs text-slate-400">{diary.date}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{diary.content}</p>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" className="text-rose-500 hover:bg-rose-50">驳回</Button>
                <Button>通过并展示</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const PointsManagement = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="商品库管理">
        <div className="space-y-4">
          {[
            { name: '自动浇水球', price: 200, stock: 15, status: '在售' },
            { name: '多肉专用营养土 (2kg)', price: 150, stock: 50, status: '在售' },
            { name: '精美手绘花盆', price: 500, stock: 5, status: '下架' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-slate-50 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center"><ShoppingBag size={18} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.price} 积分 / 件</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-slate-400">库存: {item.stock}</span>
                <Badge type={item.status === '在售' ? 'success' : 'default'}>{item.status}</Badge>
                <button className="text-slate-400 hover:text-emerald-500"><Edit size={14} /></button>
              </div>
            </div>
          ))}
          <Button variant="secondary" className="w-full mt-4" icon={Plus}>添加商品</Button>
        </div>
      </Card>

      <Card title="最新兑换动态">
        <div className="space-y-4">
          {[
            { user: '小明', item: '自动浇水球', time: '10分钟前', status: '待发货' },
            { user: '小红', item: '营养土', time: '1小时前', status: '已完成' },
            { user: '小五', item: '手绘花盆', time: '3小时前', status: '已发货' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-none">
              <div className="flex gap-2 items-center">
                <span className="font-medium text-slate-700">{log.user}</span>
                <span className="text-slate-400">兑换了</span>
                <span className="text-emerald-600 font-medium">{log.item}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-300">{log.time}</span>
                <Badge type={log.status === '待发货' ? 'warning' : 'success'}>{log.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Layout logic
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const getPageTitle = (page: Page) => {
    switch (page) {
      case 'dashboard': return '首页数据看板';
      case 'plant-list': return '绿植信息管理';
      case 'plant-form': return '绿植信息维护';
      case 'knowledge-list': return '养护知识库管理';
      case 'knowledge-form': return '文章详情发布';
      case 'adoption-review': return '领养申请审核';
      case 'activity': return '校园活动管理';
      case 'growth-diary': return '生长日记审核';
      case 'user-management': return '用户管理 (学生/老师)';
      case 'points-management': return '积分兑换管理';
      default: return '绿植领养与养护管理系统';
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-background font-sans text-text-main">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-border transition-all duration-300 flex flex-col z-40 sticky top-0 h-screen",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-border overflow-hidden text-primary shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
              <Sprout size={18} />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-primary-dark text-[11px] uppercase tracking-wider whitespace-nowrap">绿植领养管理系统</span>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <div className={cn("px-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest", !isSidebarOpen && "hidden")}>
            核心功能
          </div>
          <div className="mb-6">
            <SidebarItem icon={LayoutDashboard} label="首页数据看板" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
            <SidebarItem icon={Sprout} label="绿植信息管理" active={currentPage === 'plant-list' || currentPage === 'plant-form'} onClick={() => setCurrentPage('plant-list')} />
            <SidebarItem icon={FileCheck} label="领养申请审核" active={currentPage === 'adoption-review'} onClick={() => setCurrentPage('adoption-review')} />
          </div>

          <div className={cn("px-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest", !isSidebarOpen && "hidden")}>
            内容与活动
          </div>
          <div className="mb-6">
            <SidebarItem icon={BookOpen} label="养护知识管理" active={currentPage === 'knowledge-list' || currentPage === 'knowledge-form'} onClick={() => setCurrentPage('knowledge-list')} />
            <SidebarItem icon={Calendar} label="校园活动管理" active={currentPage === 'activity'} onClick={() => setCurrentPage('activity')} />
            <SidebarItem icon={Camera} label="生长日记审核" active={currentPage === 'growth-diary'} onClick={() => setCurrentPage('growth-diary')} />
          </div>

          <div className={cn("px-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest", !isSidebarOpen && "hidden")}>
            运营配置
          </div>
          <div>
            <SidebarItem icon={Users} label="用户管理 (学生/老师)" active={currentPage === 'user-management'} onClick={() => setCurrentPage('user-management')} />
            <SidebarItem icon={ShoppingBag} label="积分兑换管理" active={currentPage === 'points-management'} onClick={() => setCurrentPage('points-management')} />
          </div>
        </nav>

        <div className="p-4 border-t border-border bg-border-light">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary-dark font-bold text-xs shrink-0">
              张
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-700 truncate">管理员_张三</span>
                <span className="text-[10px] text-slate-400 uppercase truncate">系统主控官</span>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className={cn(
              "mt-4 w-full flex items-center gap-3 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all",
              !isSidebarOpen && "justify-center px-0"
            )}
          >
            <LogOut size={14} />
            {isSidebarOpen && <span>注销退出</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header title={getPageTitle(currentPage)} />
        
        <div className="p-8 pb-12 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentPage === 'dashboard' && <Dashboard />}
              {currentPage === 'plant-list' && <PlantList onAdd={() => setCurrentPage('plant-form')} />}
              {currentPage === 'plant-form' && <PlantForm onBack={() => setCurrentPage('plant-list')} />}
              {currentPage === 'knowledge-list' && <KnowledgeList onAdd={() => setCurrentPage('knowledge-form')} />}
              {currentPage === 'knowledge-form' && <KnowledgeForm onBack={() => setCurrentPage('knowledge-list')} />}
              {currentPage === 'adoption-review' && <AdoptionReview />}
              {currentPage === 'user-management' && <UserManagement />}
              {currentPage === 'activity' && <ActivityManagement />}
              {currentPage === 'growth-diary' && <GrowthDiaryReview />}
              {currentPage === 'points-management' && <PointsManagement />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-500 hover:text-emerald-500 z-50 transition-transform active:scale-95"
      >
        <Menu size={24} />
      </button>
    </div>
  );
}
