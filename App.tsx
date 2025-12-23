
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import ArticleCard from './components/ArticleCard';
import AIChatPanel from './components/AIChatPanel';
import { MOCK_ARTICLES, CATEGORIES } from './constants';
import { getAIPicks } from './services/geminiService';
import { Article } from './types';

// Home Component
const Home: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [aiPicks, setAiPicks] = useState<{title: string, reason: string}[]>([]);

  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const picks = await getAIPicks();
        setAiPicks(picks);
      } catch (err) {
        console.error("Failed to fetch AI picks", err);
      }
    };
    fetchPicks();
  }, []);

  const filteredArticles = selectedCategory === 'すべて' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden group img-placeholder border border-slate-800 flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="relative z-10 p-8 md:p-12 max-w-3xl">
          <span className="px-4 py-1.5 bg-purple-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-lg shadow-purple-500/20">注目のストーリー</span>
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
            メタバースの再誕：<br/> 空間コンピューティングが変える遊びの形
          </h1>
          <p className="text-slate-300 text-lg mb-6 line-clamp-2">
            VRやARを超えて、次世代の空間ゲーミングは私たちの物理的現実とデジタルな驚異を、想像もしなかった方法で融合させています。
          </p>
          <div className="flex items-center gap-6">
            <button className="px-8 py-3 bg-white text-slate-950 rounded-full font-bold hover:bg-cyan-400 transition-colors">記事を読む</button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-orbitron text-2xl font-bold tracking-tighter uppercase">LATEST <span className="text-cyan-400">FEED</span></h2>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <AIChatPanel />

          <section className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-orbitron text-sm font-bold tracking-[0.2em] text-slate-400 mb-6 uppercase">AI トレンドピック</h3>
            <div className="space-y-6">
              {aiPicks.length > 0 ? aiPicks.map((pick, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-cyan-500 font-bold text-xl group-hover:bg-cyan-600 group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-cyan-400 transition-colors">{pick.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pick.reason}</p>
                  </div>
                </div>
              )) : (
                <div className="animate-pulse space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-12 bg-slate-800 rounded-xl"></div>)}
                </div>
              )}
            </div>
          </section>

          <section className="bg-gradient-to-br from-cyan-900/10 to-purple-900/10 border border-slate-800 rounded-2xl p-6">
             <h4 className="font-bold text-sm mb-4">Lumina JP について</h4>
             <p className="text-xs text-slate-400 leading-relaxed">
               Lumina Gamingは、日本のゲームシーンに新しい風を吹き込むメディアプロジェクトです。最新テクノロジーと情熱的なジャーナリズムを融合させ、次世代の体験を提供します。
             </p>
          </section>
        </div>
      </div>
    </div>
  );
};

// ArticleDetail Component
const ArticleDetail: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === id);

  if (!article) return <div className="text-center py-20">記事が見つかりませんでした。</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group mb-4"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        一覧へ戻る
      </button>

      <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden img-placeholder border border-slate-800 relative">
        {article.imageUrl ? (
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-20 h-20 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        )}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-cyan-600 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-lg">
            {article.category}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 text-slate-500 text-sm">
          <span className="font-bold text-slate-300">{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
          {article.rating && (
            <span className="ml-auto bg-slate-900 border border-slate-700 px-3 py-1 rounded-lg text-cyan-400 font-bold">
              Score: {article.rating}/10
            </span>
          )}
        </div>
        <h1 className="font-orbitron text-4xl md:text-5xl font-bold leading-tight text-white">{article.title}</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-slate-300 leading-relaxed font-light italic border-l-4 border-cyan-500 pl-6 my-8">
            {article.excerpt}
          </p>
          <div className="text-lg text-slate-400 leading-relaxed space-y-6">
            {article.content ? article.content : "詳細な本文は現在準備中です。"}
          </div>
        </div>
      </div>
    </div>
  );
};

// PostArticle Component
const PostArticle: React.FC<{ onPost: (article: Article) => void }> = ({ onPost }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'News' as Article['category'],
    rating: '',
    imageUrl: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt) return;

    const newArticle: Article = {
      id: Date.now().toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      imageUrl: formData.imageUrl,
      author: 'ゲストライター',
      date: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: '5分で読める',
      rating: formData.rating ? parseFloat(formData.rating) : undefined
    };

    onPost(newArticle);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h2 className="font-orbitron text-3xl font-bold tracking-tighter mb-8 text-center uppercase">
        新しい記事を <span className="text-cyan-400">投稿</span>
      </h2>
      <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">カバー画像</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video w-full rounded-2xl border-2 border-dashed border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden bg-slate-950 group"
          >
            {formData.imageUrl ? (
              <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-cyan-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span className="text-xs font-medium">クリックして画像をアップロード</span>
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">タイトル</label>
          <input 
            type="text" required value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            placeholder="魅力的な見出しを入力..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">リード文（概要）</label>
          <textarea 
            required rows={3} value={formData.excerpt}
            onChange={e => setFormData({...formData, excerpt: e.target.value})}
            placeholder="読者の興味を惹く短い要約..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">本文</label>
          <textarea 
            rows={6} value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
            placeholder="ここに詳しい内容を記入..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">カテゴリー</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value as Article['category']})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {CATEGORIES.filter(c => c !== 'すべて').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">スコア (任意)</label>
            <input 
              type="number" step="0.1" min="0" max="10" value={formData.rating}
              onChange={e => setFormData({...formData, rating: e.target.value})}
              placeholder="0 - 10"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>
        <div className="pt-4">
          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-bold text-white transition-all shadow-lg shadow-cyan-900/30"
          >
            記事を公開する
          </button>
          <button type="button" onClick={() => navigate('/')} className="w-full mt-4 py-3 text-slate-500 hover:text-white text-sm transition-colors">キャンセル</button>
        </div>
      </form>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);

  const handleNewPost = (newArticle: Article) => {
    setArticles([newArticle, ...articles]);
  };

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home articles={articles} />} />
          <Route path="/post" element={<PostArticle onPost={handleNewPost} />} />
          <Route path="/article/:id" element={<ArticleDetail articles={articles} />} />
          <Route path="/news" element={<div className="p-12 text-center text-slate-400 font-orbitron uppercase tracking-widest">NEWS SECTION COMING SOON</div>} />
          <Route path="/reviews" element={<div className="p-12 text-center text-slate-400 font-orbitron uppercase tracking-widest">REVIEWS SECTION COMING SOON</div>} />
          <Route path="/esports" element={<div className="p-12 text-center text-slate-400 font-orbitron uppercase tracking-widest">ESPORTS SECTION COMING SOON</div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
