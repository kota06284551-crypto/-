
import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <NavLink to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white italic">L</div>
                <span className="font-orbitron text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  LUMINA<span className="text-cyan-400">G</span>
                </span>
              </NavLink>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
                <NavLink to="/" className={({isActive}) => isActive ? "text-cyan-400" : "hover:text-white transition-colors"}>ホーム</NavLink>
                <NavLink to="/news" className={({isActive}) => isActive ? "text-cyan-400" : "hover:text-white transition-colors"}>ニュース</NavLink>
                <NavLink to="/reviews" className={({isActive}) => isActive ? "text-cyan-400" : "hover:text-white transition-colors"}>レビュー</NavLink>
                <NavLink to="/esports" className={({isActive}) => isActive ? "text-cyan-400" : "hover:text-white transition-colors"}>eスポーツ</NavLink>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <NavLink to="/post" className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-900/20 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                投稿する
              </NavLink>
              <button className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="border-t border-slate-800 mt-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white italic">L</div>
                <span className="font-orbitron text-xl font-bold tracking-tighter">LUMINA GAMING</span>
              </div>
              <p className="text-slate-400 text-sm max-w-md">
                次世代のゲーマーのために構築された、AIによる洞察と高品質なジャーナリズム。デジタルフロンティアの最前線をお届けします。
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-200">ネットワーク</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400">ハードウェア</a></li>
                <li><a href="#" className="hover:text-cyan-400">インディーシーン</a></li>
                <li><a href="#" className="hover:text-cyan-400">開発者インタビュー</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-200">インフォメーション</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-cyan-400">利用規約</a></li>
                <li><a href="#" className="hover:text-cyan-400">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
            © 2024 Lumina Gaming Media Group. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
