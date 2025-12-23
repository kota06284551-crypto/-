
import React from 'react';
import { Article } from '../types';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/article/${article.id}`)}
      className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1 duration-300 cursor-pointer"
    >
      <div className="aspect-video overflow-hidden img-placeholder flex items-center justify-center border-b border-slate-800 relative">
        {article.imageUrl ? (
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <svg className="w-12 h-12 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-cyan-600/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
            {article.category}
          </span>
        </div>
        {article.rating && (
          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md p-2 rounded-lg border border-slate-700">
            <span className="text-cyan-400 font-bold">{article.rating}</span>
            <span className="text-slate-500 text-[10px] ml-1">/ 10</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>
        <h3 className="text-lg font-bold leading-snug group-hover:text-cyan-400 transition-colors mb-3">
          {article.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">{article.readTime}</span>
          <button className="text-cyan-400 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
            続きを読む <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
