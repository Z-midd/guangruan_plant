export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  category: string;
  stock: number;
  description: string;
  benefits?: string[];
  careTips?: string[];
  imageUrl: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  views: number;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  location: string;
  summary: string;
  content: string;
  imageUrl: string;
  enrolledCount: number;
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'finished';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  points: number;
  role: 'student' | 'volunteer' | 'teacher';
}

export interface AdoptionRecord {
  id: string;
  plantId: string;
  plantName: string;
  status: 'pending' | 'approved' | 'rejected' | 'returned';
  date: string;
  imageUrl: string;
}
