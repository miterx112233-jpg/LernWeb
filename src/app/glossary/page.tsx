'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_ITEMS,
  GlossaryCategoryId
} from '@/data/glossary';
import { AI_FUTURE_LESSONS } from '@/data/aiFutureCourse';

export default function GlossaryPage() {
  const [selectedCat, setSelectedCat] = useState<GlossaryCategoryId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [activeHash, setActiveHash] = useState('');
  const [activeCatId, setActiveCatId] = useState<string>(GLOSSARY_CATEGORIES[0].id);
  const [expandedSlugs, setExpandedSlugs] = useState<Record<string, boolean>>({});

  // เมื่อคลิกลิงก์มาจากบทเรียน (เช่น /glossary#rag) ให้เลื่อนไปหาและกางรายละเอียดคำนั้นอัตโนมัติ
  useEffect(() => {
    const updateHash = () => {
      const h = window.location.hash.replace('#', '');
      if (h) {
        setActiveHash(h);
        setSelectedCat('all');
        setExpandedSlugs(prev => ({ ...prev, [h]: true }));
        setTimeout(() => {
          document.getElementById(h)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 60);
      }
    };
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  // Scroll-Spy สำหรับสารบัญหมวดหมู่ด้านขวา
  useEffect(() => {
    const onScroll = () => {
      const offset = 150;
      let currentCat = GLOSSARY_CATEGORIES[0].id;
      for (const cat of GLOSSARY_CATEGORIES) {
        const el = document.getElementById(`cat-${cat.id}`);
        if (el && el.getBoundingClientRect().top <= offset) {
          currentCat = cat.id;
        }
      }
      setActiveCatId(currentCat);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleExpand = (slug: string) => {
    setExpandedSlugs(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  const q = query.trim().toLowerCase();
  const visibleCategories = GLOSSARY_CATEGORIES.filter(
    cat => selectedCat === 'all' || cat.id === selectedCat
  );

  const filterItem = (item: (typeof GLOSSARY_ITEMS)[number]) => {
    if (!q) return true;
    return [item.term, item.shortDef, item.fullDef, item.analogy, ...item.keywords]
      .join(' ')
      .toLowerCase()
      .includes(q);
  };

  const totalMatched = GLOSSARY_ITEMS.filter(
    item => (selectedCat === 'all' || item.category === selectedCat) && filterItem(item)
  ).length;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>คลังคำศัพท์สำหรับ Software Engineer ยุค AI</h1>
          <p>
            พจนานุกรมคำศัพท์เทคนิคที่พบบ่อยในบทเรียน สรุปกระชับเข้าใจง่าย พร้อมตัวอย่างเปรียบเทียบให้เห็นภาพจริง
          </p>
        </div>
      </section>

      <div className="container lesson" style={{ paddingTop: 28 }}>
        {/* แถบค้นหาและตัวกรองหมวดหมู่ด้านบน */}
        <div className="glossary-toolbar">
          <div className="glossary-toolbar__row">
            <div className="glossary-search">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="text"
                placeholder="ค้นหาคำศัพท์ เช่น API, JWT, RAG, Token, Embedding, Cache..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className="glossary-search__clear"
                  onClick={() => setQuery('')}
                >
                  ล้าง
                </button>
              )}
            </div>

            <div className="glossary-toolbar__meta">
              แสดง <strong>{totalMatched}</strong> คำศัพท์
            </div>
          </div>

          <div className="tabs" style={{ marginTop: 14 }}>
            <button
              type="button"
              className={`tab ${selectedCat === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedCat('all')}
            >
              ทั้งหมด ({GLOSSARY_ITEMS.length})
            </button>
            {GLOSSARY_CATEGORIES.map((cat, idx) => {
              const count = GLOSSARY_ITEMS.filter(i => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`tab ${selectedCat === cat.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedCat(cat.id)}
                >
                  0{idx + 1} · {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* โครงสร้าง 2 คอลัมน์: ซ้าย (เนื้อหาคำศัพท์แยกตามหมวด) / ขวา (สารบัญคำศัพท์เกาะติดหน้าจอ) */}
        <div className="lesson__layout">
          <div>
            {totalMatched === 0 ? (
              <div className="search-empty" style={{ padding: 48, textAlign: 'center' }}>
                ไม่พบคำศัพท์ที่ตรงกับคำค้น &ldquo;{query}&rdquo;
              </div>
            ) : (
              visibleCategories.map(cat => {
                const catIdx = GLOSSARY_CATEGORIES.findIndex(c => c.id === cat.id) + 1;
                const items = GLOSSARY_ITEMS.filter(
                  i => i.category === cat.id && filterItem(i)
                );
                if (items.length === 0) return null;

                return (
                  <section
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    className="dict-section"
                  >
                    <div className="dict-section__head">
                      <span className="dict-section__num">หมวดที่ 0{catIdx}</span>
                      <h2 className="dict-section__title">{cat.name}</h2>
                      <p className="dict-section__desc">{cat.desc}</p>
                    </div>

                    <div className="dict-list">
                      {items.map(item => {
                        const isHighlighted = activeHash === item.slug;
                        const isExpanded = Boolean(expandedSlugs[item.slug]) || Boolean(q);
                        const isCourse2 = AI_FUTURE_LESSONS.some(l => l.id === item.lessonId);
                        const coursePrefix = isCourse2 ? 'หลักสูตรที่ 2 · ' : 'หลักสูตรที่ 1 · ';

                        return (
                          <article
                            key={item.slug}
                            id={item.slug}
                            className={`dict-card ${isHighlighted ? 'is-highlighted' : ''}`}
                          >
                            <div className="dict-card__top">
                              <div className="dict-card__title-wrap">
                                <h3 className="dict-card__term">{item.term}</h3>
                                <div className="dict-card__keywords">
                                  {item.keywords.map(kw => (
                                    <span key={kw} className="dict-kw">
                                      {kw}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <Link
                                href={`/lesson/${item.lessonId}`}
                                className="dict-lesson-link"
                              >
                                {coursePrefix}บทที่ {String(item.lessonNo).padStart(2, '0')} →
                              </Link>
                            </div>

                            {/* สรุปใจความสำคัญ 1 บรรทัด */}
                            <p className="dict-card__summary">{item.shortDef}</p>

                            {/* กล่องเปรียบเทียบให้เห็นภาพ */}
                            <div className="dict-card__analogy">
                              <span className="dict-card__analogy-badge">💡 เปรียบเทียบให้เห็นภาพ</span>
                              <span>{item.analogy}</span>
                            </div>

                            {/* ปุ่มย่อ/ขยายคำอธิบายเชิงลึก */}
                            <div className="dict-card__expand">
                              <button
                                type="button"
                                className="dict-expand-btn"
                                onClick={() => toggleExpand(item.slug)}
                              >
                                <span>{isExpanded ? '▾' : '▸'}</span>
                                <span>
                                  {isExpanded
                                    ? 'ซ่อนคำอธิบายเชิงลึก'
                                    : 'อ่านคำอธิบายเชิงลึกเพิ่มเติม'}
                                </span>
                              </button>

                              {isExpanded && (
                                <div className="dict-card__detail">
                                  <p>{item.fullDef}</p>
                                  <div className="dict-card__detail-foot">
                                    <Link
                                      className="link"
                                      style={{ fontSize: 13.5 }}
                                      href={`/lesson/${item.lessonId}`}
                                    >
                                      ไปดูเนื้อหาและคลิปสอนเรื่องนี้ใน{coursePrefix}บทที่ {String(item.lessonNo).padStart(2, '0')} →
                                    </Link>
                                  </div>
                                </div>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            )}
          </div>

          {/* คอลัมน์ขวา: สารบัญหมวดหมู่และคำศัพท์เกาะติดหน้าจอ (Sticky Sidebar) */}
          <aside className="toc" aria-label="สารบัญคำศัพท์">
            <div className="toc__box">
              <div className="toc__title">หมวดหมู่คำศัพท์</div>
              <ul className="toc__list">
                {GLOSSARY_CATEGORIES.map((cat, idx) => {
                  const catItems = GLOSSARY_ITEMS.filter(i => i.category === cat.id);
                  const isCatActive =
                    selectedCat === cat.id || (selectedCat === 'all' && activeCatId === cat.id);

                  return (
                    <li key={cat.id}>
                      <a
                        href={`#cat-${cat.id}`}
                        className={isCatActive ? 'is-active' : ''}
                        onClick={() => {
                          setSelectedCat('all');
                          setActiveCatId(cat.id);
                        }}
                      >
                        0{idx + 1}. {cat.name}
                      </a>
                      {isCatActive && (
                        <ul className="sub">
                          {catItems.map(item => (
                            <li key={item.slug}>
                              <a
                                href={`#${item.slug}`}
                                className={activeHash === item.slug ? 'is-active' : ''}
                                onClick={() => {
                                  setSelectedCat('all');
                                  setActiveHash(item.slug);
                                  setExpandedSlugs(prev => ({ ...prev, [item.slug]: true }));
                                }}
                              >
                                {item.term.split(' (')[0]}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
