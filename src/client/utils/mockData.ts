import { Plant, Article, Activity, Product, User, AdoptionRecord } from '../types';

export const MOCK_PLANTS: Plant[] = [
  {
    id: '1',
    name: '绿萝',
    scientificName: 'Epipremnum aureum',
    category: '室内观叶',
    stock: 24,
    description: '绿萝是非常好养的室内植物，具有极强的空气净化能力。',
    benefits: ['甲醛吸收', '增加生活气息'],
    careTips: ['保持盆土湿润', '避免强光直射'],
    imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a207519?q=80&w=800'
  },
  {
    id: '2',
    name: '虎皮兰',
    scientificName: 'Sansevieria trifasciata',
    category: '空气净化',
    stock: 12,
    description: '虎皮兰能有效吸收二氧化碳，释放氧气。',
    benefits: ['夜间制氧', '抗辐射'],
    careTips: ['耐干旱，半个月浇一次水', '喜欢充足光照'],
    imageUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800'
  },
  {
    id: '3',
    name: '多肉-桃蛋',
    scientificName: 'Graptopetalum amethystinum',
    category: '多肉植物',
    stock: 8,
    description: '圆滚滚的粉色叶片，极具观赏价值。',
    benefits: ['解压', '点缀桌面'],
    careTips: ['见干见湿', '多晒太阳'],
    imageUrl: 'https://images.unsplash.com/photo-1509307221371-55c3268805f7?q=80&w=800'
  },
  {
    id: '4',
    name: '龟背竹',
    scientificName: 'Monstera deliciosa',
    category: '网红绿植',
    stock: 5,
    description: '叶片巨大，具有独特的裂纹，是北欧风装修的宠儿。',
    benefits: ['空间装饰', '提升格调'],
    careTips: ['喜欢湿润环境', '大叶片需定期擦拭'],
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: '新手养护手册：从入门到不落叶',
    category: '新手必看',
    summary: '很多新手入坑绿植后经常遇到叶子发黄、枯萎的情况，本篇将教你核心技巧。',
    content: '<p>养护绿植的核心在于掌握光照、水分和通风的平衡...</p>',
    imageUrl: 'https://images.unsplash.com/photo-1520302630591-fd1c66ed11a8?q=80&w=800',
    date: '2024-05-15',
    author: '王老师',
    views: 1240
  },
  {
    id: '2',
    title: '宿舍有限空间如何布置绿植区',
    category: '校园生活',
    summary: '利用垂直空间和书架，打造你的专属宿舍森林。',
    content: '<p>在宿舍养花，首先要考虑光照条件...</p>',
    imageUrl: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=800',
    date: '2024-05-10',
    author: '绿植社团',
    views: 856
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: '第一届“广软杯”多肉DIY活动',
    date: '2024-05-25',
    location: '教学楼A栋中庭',
    summary: '亲手制作属于你的多肉盆栽，现场提供所有耗材。',
    content: '<p>活动详情...</p>',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c0079b48a67?q=80&w=800',
    enrolledCount: 45,
    maxParticipants: 50,
    status: 'upcoming'
  },
  {
    id: '2',
    title: '夏季绿植养护专题讲座',
    date: '2024-05-30',
    location: '图书馆报告厅',
    summary: '特邀农学院教授讲课，解决你的绿植“中暑”问题。',
    content: '<p>讲座内容...</p>',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800',
    enrolledCount: 120,
    maxParticipants: 200,
    status: 'upcoming'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: '精选有机营养土 5L',
    price: 300,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=800',
    description: '富含腐殖质，适合绝大多数观叶绿植。'
  },
  {
    id: '2',
    name: '陶瓷极简风花盆',
    price: 500,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d445?q=80&w=800',
    description: '透气性好，颜值高，适合多肉和小型盆栽。'
  },
  {
    id: '3',
    name: '长嘴不锈钢喷壶',
    price: 800,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800',
    description: '控制水量更精准，不易生锈。'
  }
];

export const MOCK_USER: User = {
  id: 'U001',
  username: 'test_user',
  nickname: '阳光少年',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800',
  points: 1250,
  role: 'volunteer'
};

export const MOCK_RECORDS: AdoptionRecord[] = [
  {
    id: 'R001',
    plantId: '1',
    plantName: '绿萝',
    status: 'approved',
    date: '2024-05-01',
    imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a207519?q=80&w=800'
  },
  {
    id: 'R002',
    plantId: '2',
    plantName: '虎皮兰',
    status: 'pending',
    date: '2024-05-18',
    imageUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800'
  }
];
