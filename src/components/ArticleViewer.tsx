'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ARTICLES, Article } from '@/data/articles';
import { enrichHtmlWithGlossary } from '@/data/glossary';

export function ArticleBanner({ article, small = false }: { article: Article; small?: boolean }) {
  if (article.coverImage) {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const imgSrc = article.coverImage.startsWith('/')
      ? `${basePath}${article.coverImage}`
      : article.coverImage;
    return (
      <div className={`banner banner--cover ${small ? 'banner--sm' : ''}`}>
        <img
          src={imgSrc}
          alt={article.title}
          className="banner__cover-img"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`banner ${small ? 'banner--sm' : ''}`}>
      <div className="banner__grid" />
      <span className="banner__cat">
        <span className="banner__cat-dot" />
        {article.category}
      </span>
      <span className="banner__logo">LernDev</span>
      <div className="banner__text">
        <div className="banner__key">{article.keyword}</div>
        <div className="banner__sub">{article.subtitle}</div>
        <div className="banner__tagline">{article.tagline}</div>
      </div>
      <div className="banner__art">
        <svg viewBox="0 0 220 180" fill="none">
          <polygon points="110,105 200,140 110,175 20,140" fill="#133B6E" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="44" y="84" width="30" height="46" rx="2" fill="#1E3A5F" stroke="#60A5FA" strokeWidth="1.2" />
          <polygon points="118,40 160,60 118,80 76,60" fill="#38BDF8" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1.6" />
          <polygon points="76,60 118,80 118,126 76,106" fill="#1E40AF" fillOpacity="0.55" stroke="#60A5FA" strokeWidth="1.4" />
          <polygon points="160,60 118,80 118,126 160,106" fill="#0F2952" fillOpacity="0.8" stroke="#38BDF8" strokeWidth="1.4" />
          <circle cx="118" cy="60" r="4" fill="#5CE6A0" />
          <circle cx="98" cy="80" r="3.5" fill="#F59E0B" />
          <circle cx="138" cy="80" r="3.5" fill="#5CE6A0" />
        </svg>
      </div>
      <span className="banner__by">ที่มา: {article.sourceName}</span>
      <span className="banner__slogan">
        Never Stop
        <br />
        Learning
      </span>
    </div>
  );
}

export default function ArticleViewer({ article }: { article: Article }) {
  const [activeId, setActiveId] = useState<string>(article.sections[0]?.id || '');

  useEffect(() => {
    const ids: string[] = [];
    article.sections.forEach(sec => {
      ids.push(sec.id);
      sec.sub?.forEach(s => ids.push(s.id));
    });

    const onScroll = () => {
      const offset = 120;
      let current = ids[0] || '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [article]);

  const otherArticles = ARTICLES.filter(a => a.slug !== article.slug);

  return (
    <div className="container lesson">
      <Link className="breadcrumb" href="/articles">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="m15 18-6-6 6-6" />
        </svg>
        กลับไปยังบทความทั้งหมด
      </Link>

      <div className="lesson__layout">
        <article>
          <ArticleBanner article={article} />
          <p className="lesson__caption">
            ขอขอบคุณข้อมูลและบทความต้นฉบับจาก:{' '}
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', fontWeight: 600 }}>
              {article.sourceName} ↗
            </a>
          </p>
          <h1 className="lesson__title">{article.title}</h1>
          <div className="lesson__info">
            <span className="tag tag--intermediate">{article.category}</span>
            <span>ที่มา: {article.sourceName}</span>
            <span>·</span>
            <span>เวลาอ่าน {article.minutes} นาที</span>
          </div>

          {/* แถบป้าย Hashtags สีฟ้าอ่อน + เส้นคั่นแนวนอนตามภาพต้นแบบ 9Expert */}
          {article.hashtags && article.hashtags.length > 0 && (
            <div className="article-hashtags">
              {article.hashtags.map(tag => (
                <span key={tag} className="article-hashtag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose--9expert">
            {article.sections.map(sec => (
              <section key={sec.id}>
                <h2 id={sec.id}>{sec.h}</h2>
                <div dangerouslySetInnerHTML={{ __html: enrichHtmlWithGlossary(sec.html) }} />
                {sec.sub?.map(s => (
                  <div key={s.id}>
                    <h3 id={s.id}>{s.h}</h3>
                    <div dangerouslySetInnerHTML={{ __html: enrichHtmlWithGlossary(s.html) }} />
                  </div>
                ))}
              </section>
            ))}
          </div>

          {/* กล่องอ้างอิงแหล่งที่มาของบทความ (Source Attribution Box) */}
          <div className="article-source-box">
            <div className="article-source-box__label">📚 แหล่งที่มาและอ้างอิงเนื้อหา (Source &amp; Reference)</div>
            <p className="article-source-box__desc">
              เนื้อหาบทความเรื่อง <strong>“{article.title}”</strong> เรียบเรียงและอ้างอิงข้อมูลต้นฉบับจาก{' '}
              <strong>{article.sourceName}</strong> เพื่อใช้เป็นสื่อการเรียนรู้สำหรับผู้เริ่มต้นศึกษาสายเทคโนโลยีและวิศวกรรมซอฟต์แวร์
            </p>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="article-source-box__link"
            >
              <span>อ่านบทความต้นฉบับบนเว็บไซต์ {article.sourceName}</span>
              <span className="article-source-box__url">{article.sourceUrl} ↗</span>
            </a>
          </div>
        </article>

        <aside className="toc" aria-label="สารบัญบทความ">
          <div className="toc__box">
            <div className="toc__title">สารบัญ</div>
            <ul className="toc__list">
              {article.sections.map(sec => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`} className={activeId === sec.id ? 'is-active' : ''}>
                    {sec.h}
                  </a>
                  {sec.sub && sec.sub.length > 0 && (
                    <ul className="sub">
                      {sec.sub.map(s => (
                        <li key={s.id}>
                          <a href={`#${s.id}`} className={activeId === s.id ? 'is-active' : ''}>
                            {s.h}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {otherArticles.length > 0 && (
            <div className="toc__progress">
              <div className="toc__title" style={{ marginBottom: 8 }}>
                บทความอื่นที่น่าสนใจ
              </div>
              <ul className="toc__list">
                {otherArticles.map(a => (
                  <li key={a.slug}>
                    <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
