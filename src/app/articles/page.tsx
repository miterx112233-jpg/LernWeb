'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ARTICLES, ARTICLE_CATEGORIES, ArticleCategory } from '@/data/articles';
import { ArticleBanner } from '@/components/ArticleViewer';

export default function ArticlesPage() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | ArticleCategory>('all');
  const [query, setQuery] = useState('');

  const filtered = ARTICLES.filter(article => {
    const matchCat = categoryFilter === 'all' || article.category === categoryFilter;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      [article.title, article.summary, article.keyword, article.subtitle, article.category]
        .join(' ')
        .toLowerCase()
        .includes(q);
    return matchCat && matchQuery;
  });

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>บทความและเกร็ดความรู้</h1>
          <p>
            รวมบทความเสริมความรู้ กรณีศึกษา เทคนิคการทำงานร่วมกับ AI และการเตรียมตัวในสายอาชีพ Software Engineer (แยกจากเนื้อหาบทเรียนหลักใน Roadmap)
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 28, paddingBottom: 64 }}>
        <div className="filters">
          <div className="tabs" role="tablist">
            <button
              type="button"
              className={`tab ${categoryFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setCategoryFilter('all')}
            >
              ทั้งหมด ({ARTICLES.length})
            </button>
            {ARTICLE_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                className={`tab ${categoryFilter === cat ? 'is-active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="search-input" aria-label="ค้นหาบทความ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="ค้นหาบทความ..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </label>
        </div>

        {filtered.length > 0 ? (
          <div className="cards">
            {filtered.map(article => (
              <Link key={article.slug} className="card" href={`/articles/${article.slug}`}>
                <ArticleBanner article={article} small />
                <div className="card__meta">
                  <span className="tag tag--intermediate">{article.category}</span>
                  <span>
                    {article.publishedAt} · อ่าน {article.minutes} นาที
                  </span>
                </div>
                <h3 className="card__title">{article.title}</h3>
                <p className="card__summary">{article.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty">ยังไม่มีบทความในหมวดหมู่นี้</div>
        )}
      </section>
    </>
  );
}
