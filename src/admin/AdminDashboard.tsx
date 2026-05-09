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
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  ArrowUpRight,
  TrendingUp,
  Menu,
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
  ResponsiveContainer
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={cn("w-full flex items-center gap-3 px-6 py-2.5 text-xs font-medium transition-all transition-colors border-r-4", active ? "bg-primary-light text-primary-dark border-primary" : "text-slate-500 hover:bg-primary-faint border-transparent hover:text-primary")}>
    <Icon size={16} className={active ? "text-primary-dark" : "text-slate-400"} />
    <span>{label}</span>
  </button>
);

const Badge = ({ children, type = 'default' }: { children: React.ReactNode, type?: 'success' | 'warning' | 'error' | 'default' }) => {
  const styles = { success: "bg-emerald-50 text-emerald-600 border-emerald-100", warning: "bg-amber-50 text-amber-600 border-amber-100", error: "bg-rose-50 text-rose-600 border-rose-100", default: "bg-slate-50 text-slate-500 border-slate-100" };
  return <span className={cn("px-2 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-full", styles[type])}>{children}</span>;
};

const Button = ({ children, variant = 'primary', onClick, className, icon: Icon }: { children: React.ReactNode, variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline', onClick?: () => void, className?: string, icon?: any }) => {
  const variants = { primary: "bg-primary text-white hover:bg-primary-hover shadow-sm", secondary: "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200", danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-sm", ghost: "bg-transparent text-slate-500 hover:bg-slate-50", outline: "bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50" };
  return <button onClick={onClick} className={cn("flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all active:scale-[0.98] disabled:opacity-50", variants[variant], className)}>{Icon && <Icon size={14} />}{children}</button>;
};

const Card = ({ children, className, title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <div className={cn("bg-white rounded-2xl border border-border shadow-sm overflow-hidden", className)}>
    {title && <div className="px-6 py-4 border-b border-border font-bold text-xs uppercase tracking-widest text-slate-700 bg-border-light">{title}</div>}
    <div className="p-6">{children}</div>
  </div>
);

const Header = ({ title }: { title: string }) => (
  <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
    <div className="flex items-center gap-2">
      <h1 className="text-sm font-medium text-slate-500">广州软件学院绿植领养与养护管理系统 / <span className="text-primary font-bold">{title}</span></h1>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <span>{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</span>
      </div>
      <div className="h-4 w-[1px] bg-border"></div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-slate-700">管理员_张三</p>
          <p className="text-[10px] text-slate-400 uppercase">系统超级管理员</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary-light border border-primary/20 flex items-center justify-center text-primary-dark font-bold text-xs">管</div>
      </div>
    </div>
  </header>
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
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" fill="#4CAF50" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card title="热门绿植排行">
        <div className="space-y-4">
          {[{ name: '绿萝', value: 85, color: 'bg-emerald-500' }, { name: '虎皮兰', value: 62, color: 'bg-blue-500' }, { name: '多肉-桃蛋', value: 45, color: 'bg-amber-500' }, { name: '薄荷', value: 38, color: 'bg-indigo-500' }, { name: '吊兰', value: 24, color: 'bg-rose-500' }].map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-sm"><span className="text-slate-600">{item.name}</span><span className="font-medium text-slate-800">{item.value}%</span></div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className={cn("h-full transition-all duration-1000", item.color)} style={{ width: `${item.value}%` }}></div></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const PlantList = ({ onAdd }: { onAdd: () => void }) => (
  <Card className="p-0 overflow-visible">
    <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" placeholder="搜索绿植名称..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm" /></div>
        <Button variant="secondary" icon={Filter}>筛选</Button>
      </div>
      <Button onClick={onAdd} icon={Plus}>新增绿植</Button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-border-light text-[11px] text-slate-400 font-bold uppercase tracking-widest border-b border-border"><tr><th className="px-6 py-4">图片</th><th className="px-6 py-4">绿植名称</th><th className="px-6 py-4">分类</th><th className="px-6 py-4">库存</th><th className="px-6 py-4">状态</th><th className="px-6 py-4 text-right">操作</th></tr></thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
          {PLANT_DATA.map((plant) => (
            <tr key={plant.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4"><div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-emerald-500"><Sprout size={24} /></div></td>
              <td className="px-6 py-4"><p className="font-semibold text-slate-800">{plant.name}</p><p className="text-xs text-slate-400">{plant.condition}</p></td>
              <td className="px-6 py-4 text-slate-600">{plant.category}</td>
              <td className="px-6 py-4"><span className={cn(plant.stock < 10 ? "text-rose-500 font-bold" : "text-slate-800")}>{plant.stock}</span></td>
              <td className="px-6 py-4"><Badge type={plant.status === '上架' ? 'success' : 'default'}>{plant.status}</Badge></td>
              <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2 text-slate-400"><button className="p-1.5 hover:bg-slate-100"><Edit size={16} /></button><button className="p-1.5 hover:bg-slate-100"><Trash2 size={16} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const ActivityManagement = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center"><h3 className="text-lg font-bold text-slate-800">活动策划列表</h3><Button icon={Plus}>发布新活动</Button></div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[{ title: '校园绿植义诊', date: '2024-06-10', enrollment: 45, status: '报名中' }, { title: '毕业季领养专场', date: '2024-06-15', enrollment: 120, status: '即将开始' }, { title: '第一届草木节', date: '2024-05-12', enrollment: 300, status: '已结束' }].map((act, i) => (
        <Card key={i} className="p-0"><div className="aspect-video bg-emerald-50 flex items-center justify-center text-emerald-200"><Calendar size={48} /></div><div className="p-5 flex flex-col h-full"><div className="flex justify-between items-center mb-2"><Badge type={act.status === '报名中' ? 'success' : act.status === '已结束' ? 'default' : 'warning'}>{act.status}</Badge><span className="text-xs text-slate-400">{act.date}</span></div><h4 className="font-bold text-slate-800 mb-4">{act.title}</h4><div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500"><span>已报名 {act.enrollment} 人</span><div className="flex gap-2"><Edit size={16} /><Trash2 size={16} /></div></div></div></Card>
      ))}
    </div>
  </div>
);

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getPageTitle = (page: Page) => {
    switch (page) {
      case 'dashboard': return '首页数据看板';
      case 'plant-list': return '绿植信息管理';
      case 'adoption-review': return '领养申请审核';
      case 'activity': return '校园活动管理';
      case 'growth-diary': return '生长日记审核';
      case 'user-management': return '用户管理';
      case 'points-management': return '积分兑换管理';
      default: return '管理系统';
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans text-text-main">
      <aside className={cn("bg-white border-r border-border transition-all duration-300 flex flex-col z-40 sticky top-0 h-screen", isSidebarOpen ? "w-64" : "w-16")}>
        <div className="h-16 flex items-center px-6 border-b border-border overflow-hidden text-primary shrink-0"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"><Sprout size={18} /></div>{isSidebarOpen && <span className="font-bold text-primary-dark text-[11px] uppercase tracking-wider whitespace-nowrap">绿植领养管理系统</span>}</div></div>
        <nav className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <div className="px-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isSidebarOpen ? "核心功能" : "•"}</div>
          <SidebarItem icon={LayoutDashboard} label="首页数据看板" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
          <SidebarItem icon={Sprout} label="绿植信息管理" active={currentPage === 'plant-list'} onClick={() => setCurrentPage('plant-list')} />
          <SidebarItem icon={FileCheck} label="领养申请审核" active={currentPage === 'adoption-review'} onClick={() => setCurrentPage('adoption-review')} />
          <div className="px-6 mt-6 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isSidebarOpen ? "内容活动" : "•"}</div>
          <SidebarItem icon={Calendar} label="校园活动管理" active={currentPage === 'activity'} onClick={() => setCurrentPage('activity')} />
        </nav>
      </aside>
      <main className="flex-1 flex flex-col min-w-0">
        <Header title={getPageTitle(currentPage)} />
        <div className="p-8 pb-12 flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'plant-list' && <PlantList onAdd={() => {}} />}
          {currentPage === 'activity' && <ActivityManagement />}
        </div>
      </main>
    </div>
  );
}
