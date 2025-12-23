
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // 本文フィールドを追加
  category: 'News' | 'Review' | 'Guide' | 'eSports';
  imageUrl: string;
  author: string;
  date: string;
  readTime: string;
  rating?: number;
}

export interface GameTrend {
  name: string;
  popularity: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
